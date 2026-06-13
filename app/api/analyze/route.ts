import { NextResponse } from "next/server";
import { AIAnalyzeError, callDeepSeekAnalyze } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

function errorResponse(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function getTextField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "offer-catcher-analyze",
    deepSeekConfigured: Boolean(process.env.DEEPSEEK_API_KEY),
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resumeFileValue = formData.get("resumeFile");
    const resumeFile =
      resumeFileValue instanceof File && resumeFileValue.size > 0
        ? resumeFileValue
        : null;
    const providedResumeText = getTextField(formData, "resumeText");
    const jobTitle = getTextField(formData, "jobTitle");
    const jobDescription = getTextField(formData, "jobDescription");

    if (!resumeFile && !providedResumeText) {
      return errorResponse("请上传简历或使用示例简历");
    }

    if (!jobDescription) {
      return errorResponse("请提供岗位 JD");
    }

    let resumeText = providedResumeText;

    if (!resumeText && resumeFile) {
      const { isSupportedResumeFile, parseResumeFile } = await import(
        "@/lib/parseResume"
      );

      if (!isSupportedResumeFile(resumeFile)) {
        return errorResponse("当前仅支持 PDF / DOCX 格式简历");
      }

      resumeText = await parseResumeFile(resumeFile);
    }

    if (!resumeText) {
      return errorResponse("简历内容为空，请检查文件或使用示例简历");
    }

    const result = await callDeepSeekAnalyze({
      resumeText,
      jobTitle,
      jobDescription,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AIAnalyzeError) {
      return errorResponse(error.message, error.status);
    }

    console.error("Analyze request failed:", error);
    if (
      error instanceof Error &&
      error.message === "当前仅支持 PDF / DOCX 格式简历"
    ) {
      return errorResponse(error.message);
    }

    return errorResponse("分析失败，请检查文件格式或稍后重试", 500);
  }
}
