"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";

const steps = [
  {
    title: "Parsing Resume",
    description: "读取简历结构与经历信息",
  },
  {
    title: "Extracting Skills",
    description: "提取技能、成果与求职亮点",
  },
  {
    title: "Matching JD",
    description: "对齐岗位职责、要求与关键词",
  },
  {
    title: "Generating Insights",
    description: "生成匹配洞察与优化建议",
  },
];

export function AIThinkingFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, steps.length - 1));
    }, 1400);

    return () => window.clearInterval(timer);
  }, []);

  const progress = [18, 43, 70, 92][activeStep];

  return (
    <Card className="relative overflow-hidden border-blue-400/20 p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[90px]"
      />

      <div className="relative">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              AI Thinking Flow
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-50">
              正在构建岗位匹配报告
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              AI 正在分阶段理解你的简历与目标岗位。
            </p>
          </div>
          <span className="w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm font-semibold text-blue-300">
            {progress}% Complete
          </span>
        </div>

        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => {
            const isComplete = index < activeStep;
            const isActive = index === activeStep;

            return (
              <li
                key={step.title}
                className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ease-out ${
                  isActive
                    ? "border-blue-400/50 bg-blue-500/15 shadow-[0_0_38px_rgba(59,130,246,0.2)]"
                    : isComplete
                      ? "border-emerald-400/20 bg-emerald-500/[0.07]"
                      : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 h-24 w-24 animate-pulse rounded-full bg-blue-400/20 blur-2xl"
                  />
                )}
                <div className="relative flex items-start gap-4">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300 ease-out ${
                      isActive
                        ? "border-blue-300/50 bg-blue-500/20 text-blue-200 shadow-[0_0_20px_rgba(96,165,250,0.35)]"
                        : isComplete
                          ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-300"
                          : "border-white/10 bg-white/5 text-slate-500"
                    }`}
                  >
                    {isComplete ? "✓" : String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`font-semibold ${
                          isActive
                            ? "text-blue-200"
                            : isComplete
                              ? "text-emerald-300"
                              : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </h4>
                      {isActive && (
                        <span className="rounded-full bg-blue-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                          Thinking
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>{steps[activeStep].title}</span>
            <span>{progress}%</span>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-label="AI 分析进度"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
