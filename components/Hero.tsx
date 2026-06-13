import { Card } from "@/components/Card";
import { designSystem } from "@/lib/designSystem";

type HeroProps = {
  onLoadSample: () => void;
};

const tags = [
  "Resume Parsing",
  "JD Matching",
  "AI Scoring",
  "Resume Optimization",
];

const strengths = [
  "具备完整 AI 产品项目经验",
  "覆盖用户研究与 Prompt 设计",
  "数据分析能力与岗位高度匹配",
];

const dimensions = [
  { name: "岗位技能", score: 92 },
  { name: "项目经历", score: 86 },
  { name: "关键词覆盖", score: 81 },
];

export function Hero({ onLoadSample }: HeroProps) {
  return (
    <section id="top" className="relative scroll-mt-20 px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-24 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-[110px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
        <div className="animate-enter max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 shadow-lg backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
            AI Resume × JD Matching Agent
          </div>

          <h1 className="mt-7 text-balance text-5xl font-bold tracking-[-0.06em] text-slate-50 sm:text-7xl lg:text-8xl">
            Offer{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              捕手
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-slate-400 sm:text-xl sm:leading-9">
            面向学生求职场景的 AI
            岗位匹配智能体，快速判断简历与目标岗位的匹配度，并生成可直接使用的优化建议。
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className={designSystem.components.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#analyze"
              className={`${designSystem.components.primaryButton} inline-flex items-center justify-center px-7`}
            >
              开始匹配分析
            </a>
            <button
              type="button"
              onClick={onLoadSample}
              className={`${designSystem.components.secondaryButton} inline-flex items-center justify-center px-7`}
            >
              体验示例 Demo
            </button>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            上传 PDF / DOCX 简历，约 1 分钟获得完整岗位匹配报告。
          </p>
        </div>

        <div className="animate-enter-delayed relative mx-auto w-full max-w-xl lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute inset-8 -z-10 rounded-full bg-blue-500/25 blur-[90px]"
          />

          <div className="animate-float-slow">
          <Card as="article" className="group relative overflow-hidden bg-white/[0.06] p-5 shadow-2xl shadow-blue-950/40 hover:border-blue-400/30 hover:shadow-[0_24px_80px_rgba(59,130,246,0.22)] sm:p-7">
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/80 to-transparent"
            />

            <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    AI Analysis Complete
                  </p>
                </div>
                <h2 className="mt-2 text-lg font-bold text-slate-100">
                  AI 产品经理实习生
                </h2>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                推荐投递
              </span>
            </header>

            <div className="grid gap-5 py-6 sm:grid-cols-[0.78fr_1.22fr]">
              <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/[0.06] p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                  Match Score
                </p>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-6xl font-bold tracking-tight text-white">
                    86
                  </span>
                  <span className="mb-2 text-sm font-semibold text-slate-400">
                    / 100
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Strength Preview
                </p>
                <ul className="mt-4 space-y-3">
                  {strengths.map((strength) => (
                    <li
                      key={strength}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-5">
              {dimensions.map((dimension) => (
                <div key={dimension.name}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">{dimension.name}</span>
                    <span className="text-blue-300">{dimension.score}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${dimension.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <footer className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {["Prompt Engineering", "原型设计", "用户研究"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </footer>
          </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
