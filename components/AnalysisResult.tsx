import { CopyButton } from "@/components/CopyButton";
import { Card } from "@/components/Card";
import { AIThinkingFlow } from "@/components/AIThinkingFlow";
import type {
  AnalysisResult as AnalysisResultData,
  DimensionScore,
} from "@/lib/schema";

type AnalysisResultProps = {
  result?: AnalysisResultData | null;
  isLoading?: boolean;
  error?: string;
};

type Tone = "blue" | "emerald" | "amber";

const toneStyles: Record<Tone, { border: string; surface: string; text: string; dot: string }> = {
  blue: {
    border: "border-blue-400/20",
    surface: "bg-blue-500/[0.07]",
    text: "text-blue-300",
    dot: "bg-blue-400",
  },
  emerald: {
    border: "border-emerald-400/20",
    surface: "bg-emerald-500/[0.07]",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  amber: {
    border: "border-amber-400/20",
    surface: "bg-amber-500/[0.07]",
    text: "text-amber-300",
    dot: "bg-amber-400",
  },
};

function GlassPlaceholder({
  title,
  description,
  compact = false,
}: {
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.025] ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl"
      />
      <div className="relative flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-xs font-bold text-blue-300">
          AI
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-300">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-bold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function ScoreBar({ dimension }: { dimension: DimensionScore }) {
  const score = Math.max(0, Math.min(100, dimension.score));

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-white/[0.07] hover:shadow-[0_14px_34px_rgba(59,130,246,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-slate-100">{dimension.name}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-400">{dimension.reason}</p>
        </div>
        <span className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-lg font-bold text-blue-300">
          {score}
        </span>
      </div>
      <div
        className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label={dimension.name}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 shadow-[0_0_14px_rgba(34,211,238,0.4)]"
          style={{ width: `${score}%` }}
        />
      </div>
    </article>
  );
}

function BulletCards({ items, tone }: { items: string[]; tone: Tone }) {
  const styles = toneStyles[tone];

  if (items.length === 0) {
    return (
      <GlassPlaceholder
        compact
        title="Waiting for AI signals"
        description="完成分析后，AI 会在这里生成结构化洞察。"
      />
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className={`flex gap-3 rounded-xl border p-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_10px_28px_rgba(59,130,246,0.08)] ${styles.border} ${styles.surface}`}
        >
          <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${styles.dot}`} />
          <p className="text-sm leading-6 text-slate-300">{item}</p>
        </div>
      ))}
    </div>
  );
}

function KeywordGroup({
  title,
  keywords,
  tone,
}: {
  title: string;
  keywords: string[];
  tone: "emerald" | "amber";
}) {
  const styles = toneStyles[tone];

  return (
    <div className={`rounded-2xl border p-5 ${styles.border} ${styles.surface}`}>
      <div className="flex items-center justify-between gap-3">
        <h4 className={`font-semibold ${styles.text}`}>{title}</h4>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-400">
          {keywords.length}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.length > 0 ? (
          keywords.map((keyword) => (
            <span
              key={keyword}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${styles.border} ${styles.surface} ${styles.text}`}
            >
              {keyword}
            </span>
          ))
        ) : (
          <GlassPlaceholder
            compact
            title="Keyword intelligence pending"
            description="AI 将根据简历与 JD 自动识别关键词。"
          />
        )}
      </div>
    </div>
  );
}

function ActionItems({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <GlassPlaceholder
        title="Action plan pending"
        description="完成匹配分析后，AI 会生成可执行的简历优化步骤。"
      />
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item, index) => (
        <article
          key={`${item}-${index}`}
          className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/[0.07] hover:shadow-[0_14px_34px_rgba(59,130,246,0.1)]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-sm font-bold text-blue-300">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm leading-7 text-slate-300">{item}</p>
        </article>
      ))}
    </div>
  );
}

export function AnalysisResult({
  result,
  isLoading = false,
  error = "",
}: AnalysisResultProps) {
  if (isLoading) {
    return (
      <section id="analysis-result" className="animate-enter scroll-mt-24" aria-labelledby="result-title">
        <ResultHeading />
        <AIThinkingFlow />
      </section>
    );
  }

  if (error) {
    return <ReportState type="error" message={error} />;
  }

  if (!result) {
    return <ReportState type="empty" />;
  }

  const score = Math.max(0, Math.min(100, result.overallScore));

  return (
    <section
      id="analysis-result"
      className="animate-enter scroll-mt-24"
      aria-labelledby="result-title"
    >
      <ResultHeading />

      <div className="space-y-6">
        <Card as="article" className="relative overflow-hidden border-blue-400/20 bg-gradient-to-br from-blue-500/25 via-indigo-500/10 to-cyan-400/[0.08] p-7 shadow-[0_24px_90px_rgba(59,130,246,0.16)] sm:p-9">
          <div aria-hidden="true" className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-cyan-400/15 blur-[90px]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="border-b border-white/10 pb-7 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Insight Banner
              </p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-7xl font-bold tracking-tight text-white sm:text-8xl">
                  {score}
                </span>
                <span className="mb-3 text-lg font-semibold text-blue-200">/ 100</span>
              </div>
              <span className="mt-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                {result.matchLevel}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-200">AI 核心洞察</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                这份简历与目标岗位的匹配表现已完成评估
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
                {result.summary}
              </p>
            </div>
          </div>
        </Card>

        <Card as="section" className="p-6 sm:p-8" aria-labelledby="score-matrix-title">
          <SectionHeader
            eyebrow="Score Matrix"
            title="五维能力矩阵"
            description="从岗位技能、经历、岗位理解、关键词和表达质量评估你的投递准备度。"
          />
          <div id="score-matrix-title" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {result.dimensionScores.map((dimension) => (
              <ScoreBar key={dimension.name} dimension={dimension} />
            ))}
          </div>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2" aria-label="优势与短板">
          <Card as="article" className="border-emerald-400/15 p-6 sm:p-8">
            <SectionHeader
              eyebrow="Strength Signals"
              title="匹配优势"
              description="这些是简历中最值得在投递和面试中强调的证据。"
            />
            <BulletCards items={result.strengths} tone="emerald" />
          </Card>
          <Card as="article" className="border-amber-400/15 p-6 sm:p-8">
            <SectionHeader
              eyebrow="Risk Signals"
              title="主要短板"
              description="这些缺口可能影响简历初筛，需要优先补强或解释。"
            />
            <BulletCards items={result.weaknesses} tone="amber" />
          </Card>
        </section>

        <Card as="section" className="p-6 sm:p-8" aria-labelledby="keyword-title">
          <SectionHeader
            eyebrow="Keyword Intelligence"
            title="关键词情报"
            description="对照 JD 识别已建立的能力信号，以及仍需补充的关键词。"
          />
          <div id="keyword-title" className="grid gap-4 md:grid-cols-2">
            <KeywordGroup title="Covered Keywords" keywords={result.coveredKeywords} tone="emerald" />
            <KeywordGroup title="Missing Keywords" keywords={result.missingKeywords} tone="amber" />
          </div>
        </Card>

        <Card as="section" className="p-6 sm:p-8" aria-labelledby="action-plan-title">
          <SectionHeader
            eyebrow="Action Plan"
            title="投递前行动计划"
            description="按优先级执行这些动作，让简历和面试表达更贴近目标岗位。"
          />
          <div id="action-plan-title">
            <ActionItems items={result.resumeSuggestions} />
          </div>

          <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-blue-300">
                推荐岗位方向
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.recommendedDirections.map((direction) => (
                  <span
                    key={direction}
                    className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm font-semibold text-blue-300"
                  >
                    {direction}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">
                面试准备
              </h4>
              <div className="mt-4">
                <BulletCards items={result.interviewTips} tone="blue" />
              </div>
            </div>
          </div>
        </Card>

        <Card as="section" className="p-6 sm:p-8" aria-labelledby="outputs-title">
          <SectionHeader
            eyebrow="Copyable Outputs"
            title="可直接使用的简历内容"
            description="复制岗位定制摘要和优化后的经历表达，继续结合真实经历完善简历。"
          />

          <div id="outputs-title" className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.07] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                  Custom Resume Summary
                </p>
                <h4 className="mt-2 font-semibold text-slate-100">岗位定制个人摘要</h4>
              </div>
              <CopyButton text={result.customResumeSummary} />
            </div>
            <p className="mt-5 leading-8 text-slate-200">
              {result.customResumeSummary || "AI 将根据目标岗位生成一段可复制的定制个人摘要。"}
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {result.rewrittenExperience.length > 0 ? (
              result.rewrittenExperience.map((experience, index) => (
                <article
                  key={`${experience.original}-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="border-b border-white/10 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Original Experience
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {experience.original}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/[0.08] to-cyan-400/[0.04] p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                        Optimized Output
                      </p>
                      <CopyButton text={experience.optimized} />
                    </div>
                    <p className="mt-4 leading-8 text-slate-200">{experience.optimized}</p>
                  </div>
                </article>
              ))
            ) : (
              <GlassPlaceholder
                title="Optimized experience pending"
                description="AI 将基于真实经历生成可复制的优化表达。"
              />
            )}
          </div>
        </Card>
      </div>

      <p className="mt-6 text-center text-sm leading-6 text-slate-500">
        分析结果仅供求职准备参考，不代表真实企业筛选结果。
      </p>
    </section>
  );
}

function ReportState({
  type,
  message = "",
}: {
  type: "error" | "empty";
  message?: string;
}) {
  const content = {
    error: {
      title: "分析失败",
      description: message,
    },
    empty: {
      title: "AI Report is ready when you are",
      description: "Upload resume to start analysis. AI will generate your career report.",
    },
  }[type];

  if (type === "empty") {
    return (
      <section id="analysis-result" className="animate-enter scroll-mt-24" aria-labelledby="result-title">
        <ResultHeading />
        <Card className="relative overflow-hidden border-blue-400/15 p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-52 w-[34rem] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[100px]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                AI Waiting Mode
              </span>
              <h3 className="mt-5 text-2xl font-bold text-slate-50 sm:text-3xl">
                {content.title}
              </h3>
              <p className="mt-3 max-w-lg leading-7 text-slate-400">
                {content.description}
              </p>

              <ol className="mt-7 space-y-3">
                {[
                  "Upload resume to start analysis",
                  "Choose a target role or paste JD",
                  "AI will generate your career report",
                ].map((hint, index) => (
                  <li
                    key={hint}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-xs font-bold text-blue-300">
                      {index + 1}
                    </span>
                    {hint}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 shadow-inner shadow-black/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Career Report Preview
                  </span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-500">
                  Waiting
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
                <div className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-dashed border-blue-400/20 bg-blue-500/[0.05]">
                  <span className="text-5xl font-bold text-white/15">--</span>
                  <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Match Score
                  </span>
                </div>
                <div className="space-y-3">
                  {[78, 58, 86].map((width, index) => (
                    <div
                      key={width}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="h-2.5 w-24 rounded-full bg-white/10" />
                        <div className="h-5 w-8 rounded-lg bg-blue-500/10" />
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-blue-400/20"
                          style={{ width: `${width - index * 8}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <GlassPlaceholder
                  compact
                  title="Strength signals"
                  description="AI insights will appear here."
                />
                <GlassPlaceholder
                  compact
                  title="Action plan"
                  description="Next steps will appear here."
                />
              </div>
            </div>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section id="analysis-result" className="animate-enter scroll-mt-24" aria-labelledby="result-title">
      <ResultHeading />
      <Card
        role={type === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`flex min-h-80 flex-col items-center justify-center px-6 py-14 text-center ${
          type === "error" ? "border-rose-400/20 bg-rose-500/10" : ""
        }`}
      >
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-xl font-bold ${
            type === "error"
              ? "border-rose-400/20 bg-rose-500/15 text-rose-300"
              : "border-blue-400/20 bg-blue-500/10 text-blue-300"
          }`}
        >
          {type === "error" ? "!" : "AI"}
        </span>
        <h3 className="mt-6 text-xl font-bold text-slate-50">{content.title}</h3>
        <p className="mt-3 max-w-lg leading-7 text-slate-400">{content.description}</p>
      </Card>
    </section>
  );
}

function ResultHeading() {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="section-kicker">AI Report Dashboard</p>
      <h2 id="result-title" className="section-title">
        你的岗位匹配报告
      </h2>
      <p className="section-description">
        从洞察、评分、关键词到可执行优化内容，形成完整的投递决策工作台。
      </p>
    </div>
  );
}
