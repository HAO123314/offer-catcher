import { Card } from "@/components/Card";
import { jobs } from "@/data/jobs";
import { designSystem } from "@/lib/designSystem";

type JobSelectorProps = {
  selectedJobId: string;
  jobDescription: string;
  onJobChange: (jobId: string) => void;
  onJobDescriptionChange: (description: string) => void;
  onLoadJobDescription: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
};

export function JobSelector({
  selectedJobId,
  jobDescription,
  onJobChange,
  onJobDescriptionChange,
  onLoadJobDescription,
  onAnalyze,
  isAnalyzing,
}: JobSelectorProps) {
  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) ?? jobs[0];

  return (
    <Card as="article" className="group relative flex min-h-[36rem] flex-col overflow-hidden p-6 hover:border-cyan-400/25 sm:p-8">
      <div aria-hidden="true" className="absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            Job Intelligence Engine
          </span>
          <h3 className="mt-5 text-2xl font-bold text-slate-50">构建岗位上下文</h3>
          <p className="mt-2 leading-7 text-slate-400">
            载入标准岗位模型，或输入你的目标岗位 JD。
          </p>
        </div>
        <div className="hidden rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 sm:block">
          JD Ready
        </div>
      </div>

      <div className="relative mt-7 flex flex-1 flex-col gap-5">
        <label className="relative block">
          <span className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-slate-300">
            内置岗位模型
            <span className="text-xs font-normal text-slate-500">{jobs.length} 个岗位</span>
          </span>
          <div className="relative">
            <select
              value={selectedJobId}
              onChange={(event) => onJobChange(event.target.value)}
              className={`${designSystem.components.input} appearance-none pr-11`}
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} · {job.category}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300 transition-transform duration-300"
            >
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </div>
        </label>

        <div>
          <span className="mb-3 block text-sm font-semibold text-slate-300">
            岗位关键词
          </span>
          <div className="flex flex-wrap gap-2" aria-label={`${selectedJob.title}岗位关键词`}>
            {selectedJob.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <label className="flex flex-1 flex-col">
          <span className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-slate-300">
            JD Context
            <span className="text-xs font-normal text-slate-500">
              {jobDescription.length} 字
            </span>
          </span>
          <textarea
            rows={10}
            value={jobDescription}
            onChange={(event) => onJobDescriptionChange(event.target.value)}
            placeholder="在这里粘贴岗位职责与任职要求..."
            className={`${designSystem.components.input} min-h-64 flex-1 resize-y p-4 leading-6`}
          />
        </label>
      </div>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-[0.72fr_1.28fr]">
        <button
          type="button"
          onClick={onLoadJobDescription}
          className={designSystem.components.secondaryButton}
        >
          加载示例 JD
        </button>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={designSystem.components.primaryButton}
        >
          {isAnalyzing ? "AI 正在分析，请稍候……" : "运行匹配分析"}
        </button>
      </div>
    </Card>
  );
}
