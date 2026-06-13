const steps = [
  {
    number: "01",
    title: "上传简历",
    description:
      "支持 PDF / DOCX，AI 自动识别教育背景、实习经历、项目经历和技能关键词。",
  },
  {
    number: "02",
    title: "选择岗位",
    description: "选择内置岗位，或粘贴你感兴趣的岗位 JD。",
  },
  {
    number: "03",
    title: "生成报告",
    description:
      "输出匹配度、多维评分、优势短板、关键词覆盖和简历优化建议。",
  },
];

export function Steps() {
  return (
    <section id="workflow" className="animate-enter scroll-mt-24" aria-labelledby="steps-title">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="section-kicker">简单三步</p>
        <h2 id="steps-title" className="section-title">
          从简历到更合适的 Offer
        </h2>
        <p className="section-description">
          告别逐条阅读 JD，让 AI 帮你快速完成匹配判断与简历优化。
        </p>
      </div>

      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <Card
            as="li"
            key={step.number}
            className="group relative min-h-64 overflow-hidden p-7 hover:border-blue-400/30"
          >
            <span className="absolute right-5 top-3 text-7xl font-bold tracking-tighter text-white/5 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-blue-400/15">
              {step.number}
            </span>
            <div className="relative flex h-full flex-col justify-end">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-slate-50">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{step.description}</p>
            </div>
          </Card>
        ))}
      </ol>
    </section>
  );
}
import { Card } from "@/components/Card";
