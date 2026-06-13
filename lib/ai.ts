import "server-only";

import type { AnalysisResult } from "@/lib/schema";

type AnalyzeInput = {
  resumeText: string;
  jobTitle: string;
  jobDescription: string;
};

type DeepSeekResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
};

const dimensionNames = [
  "岗位技能匹配度",
  "项目 / 实习经历匹配度",
  "行业与岗位理解度",
  "JD关键词覆盖度",
  "简历表达清晰度",
] as const;

const matchLevels = new Set([
  "推荐投递",
  "可以投递但需优化",
  "暂不建议投递",
]);

const systemPrompt = `你是一个专业的学生求职匹配分析智能体，擅长根据学生简历和目标岗位 JD，判断简历与岗位的匹配程度，并给出具体、可执行的简历优化建议。

请基于学生简历、目标岗位和岗位 JD，完成：
1. 综合匹配度评分，0-100 分
2. 推荐投递等级，只能是：推荐投递、可以投递但需优化、暂不建议投递
3. 五个维度评分：
   - 岗位技能匹配度
   - 项目 / 实习经历匹配度
   - 行业与岗位理解度
   - JD关键词覆盖度
   - 简历表达清晰度
4. 匹配优势
5. 主要短板
6. 已覆盖关键词
7. 缺失关键词
8. 简历优化建议
9. 项目 / 实习经历改写示例
10. 岗位定制个人摘要
11. 推荐岗位方向
12. 面试准备建议

请严格返回 JSON，不要 Markdown，不要代码块，不要解释性文字。

JSON 必须严格符合以下结构：
{
  "overallScore": 0,
  "matchLevel": "推荐投递",
  "summary": "",
  "dimensionScores": [
    { "name": "岗位技能匹配度", "score": 0, "reason": "" },
    { "name": "项目 / 实习经历匹配度", "score": 0, "reason": "" },
    { "name": "行业与岗位理解度", "score": 0, "reason": "" },
    { "name": "JD关键词覆盖度", "score": 0, "reason": "" },
    { "name": "简历表达清晰度", "score": 0, "reason": "" }
  ],
  "strengths": [],
  "weaknesses": [],
  "coveredKeywords": [],
  "missingKeywords": [],
  "resumeSuggestions": [],
  "rewrittenExperience": [
    { "original": "", "optimized": "" }
  ],
  "customResumeSummary": "",
  "recommendedDirections": [],
  "interviewTips": []
}

约束：
1. overallScore 和所有维度 score 必须是 0-100 的数字。
2. dimensionScores 必须包含且仅包含指定的 5 个维度。
3. rewrittenExperience 至少返回 1 条。
4. customResumeSummary 控制在 80-120 个中文字符左右。
5. 所有内容使用中文输出，但可以保留 JD、AI、Prompt、SQL、Python 等英文术语。
6. 不要编造学生简历中没有的经历，只能在原有经历基础上优化表达。`;

export class AIAnalyzeError extends Error {
  constructor(
    message: string,
    public readonly status = 502,
  ) {
    super(message);
    this.name = "AIAnalyzeError";
  }
}

function cleanJsonContent(content: string) {
  return content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isScore(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100;
}

function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (!isRecord(value)) {
    return false;
  }

  const dimensions = value.dimensionScores;
  const rewritten = value.rewrittenExperience;

  return (
    isScore(value.overallScore) &&
    typeof value.matchLevel === "string" &&
    matchLevels.has(value.matchLevel) &&
    typeof value.summary === "string" &&
    Array.isArray(dimensions) &&
    dimensions.length === dimensionNames.length &&
    dimensionNames.every((name) =>
      dimensions.some(
        (dimension) =>
          isRecord(dimension) &&
          dimension.name === name &&
          isScore(dimension.score) &&
          typeof dimension.reason === "string",
      ),
    ) &&
    isStringArray(value.strengths) &&
    isStringArray(value.weaknesses) &&
    isStringArray(value.coveredKeywords) &&
    isStringArray(value.missingKeywords) &&
    isStringArray(value.resumeSuggestions) &&
    Array.isArray(rewritten) &&
    rewritten.length >= 1 &&
    rewritten.every(
      (item) =>
        isRecord(item) &&
        typeof item.original === "string" &&
        typeof item.optimized === "string",
    ) &&
    typeof value.customResumeSummary === "string" &&
    isStringArray(value.recommendedDirections) &&
    isStringArray(value.interviewTips)
  );
}

export async function callDeepSeekAnalyze({
  resumeText,
  jobTitle,
  jobDescription,
}: AnalyzeInput): Promise<AnalysisResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = (process.env.DEEPSEEK_API_BASE_URL || "https://api.deepseek.com").replace(
    /\/+$/,
    "",
  );
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) {
    throw new AIAnalyzeError("服务端尚未配置 DeepSeek API Key", 500);
  }

  let response: Response;

  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      signal: AbortSignal.timeout(60_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `学生简历：\n${resumeText}\n\n目标岗位：\n${jobTitle || "未提供岗位名称"}\n\n岗位 JD：\n${jobDescription}`,
          },
        ],
        temperature: 0.3,
      }),
    });
  } catch {
    throw new AIAnalyzeError("AI 分析服务连接失败，请稍后重试");
  }

  let payload: DeepSeekResponse;

  try {
    payload = (await response.json()) as DeepSeekResponse;
  } catch {
    throw new AIAnalyzeError("AI 分析服务返回了无法识别的响应");
  }

  if (!response.ok) {
    console.error("DeepSeek API error:", response.status, payload.error?.message);
    throw new AIAnalyzeError("AI 分析服务暂时不可用，请稍后重试", response.status);
  }

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new AIAnalyzeError("AI 未返回分析结果，请稍后重试");
  }

  let result: unknown;

  try {
    result = JSON.parse(cleanJsonContent(content));
  } catch {
    throw new AIAnalyzeError("AI 返回结果解析失败，请稍后重试");
  }

  if (!isAnalysisResult(result)) {
    throw new AIAnalyzeError("AI 返回结果格式不完整，请稍后重试");
  }

  return result;
}
