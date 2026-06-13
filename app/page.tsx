"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Steps } from "@/components/Steps";
import { ResumeUploader } from "@/components/ResumeUploader";
import { JobSelector } from "@/components/JobSelector";
import { AnalysisResult } from "@/components/AnalysisResult";
import { Footer } from "@/components/Footer";
import { AppHeader } from "@/components/AppHeader";
import { jobs } from "@/data/jobs";
import { sampleJobId, sampleResumeText } from "@/lib/sample";
import type { AnalysisResult as AnalysisResultData } from "@/lib/schema";

export default function Home() {
  const defaultJob = jobs[0];
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSampleResume, setIsSampleResume] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(defaultJob.id);
  const [jobDescription, setJobDescription] = useState(defaultJob.jd);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(
    null,
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  function loadSampleDemo() {
    const sampleJob = jobs.find((job) => job.id === sampleJobId) ?? defaultJob;

    setResumeText(sampleResumeText);
    setResumeFile(null);
    setIsSampleResume(true);
    setSelectedJobId(sampleJob.id);
    setJobDescription(sampleJob.jd);

    window.requestAnimationFrame(() => {
      document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function handleFileChange(file: File | null) {
    setResumeFile(file);
    setResumeText("");
    setIsSampleResume(false);
  }

  function handleJobChange(jobId: string) {
    const job = jobs.find((item) => item.id === jobId);

    if (!job) {
      return;
    }

    setSelectedJobId(job.id);
    setJobDescription(job.jd);
  }

  function loadSelectedJobDescription() {
    const selectedJob =
      jobs.find((job) => job.id === selectedJobId) ?? defaultJob;
    setJobDescription(selectedJob.jd);
  }

  async function handleAnalyze() {
    if (isAnalyzing) {
      return;
    }

    if (!resumeFile && !resumeText.trim()) {
      setAnalysisError("请先上传简历或使用示例简历");
      setAnalysisResult(null);
      scrollToResult();
      return;
    }

    if (!jobDescription.trim()) {
      setAnalysisError("请先选择岗位或粘贴岗位 JD");
      setAnalysisResult(null);
      scrollToResult();
      return;
    }

    const selectedJob =
      jobs.find((job) => job.id === selectedJobId) ?? defaultJob;
    const formData = new FormData();

    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    } else {
      formData.append("resumeText", resumeText);
    }

    formData.append("jobTitle", selectedJob.title);
    formData.append("jobDescription", jobDescription);

    setIsAnalyzing(true);
    setAnalysisError("");
    setAnalysisResult(null);
    scrollToResult();

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as AnalysisResultData | { error?: string };

      if (!response.ok) {
        throw new Error(
          "error" in payload && payload.error
            ? payload.error
            : "分析失败，请稍后重试",
        );
      }

      setAnalysisResult(payload as AnalysisResultData);
    } catch (error) {
      setAnalysisError(
        error instanceof Error ? error.message : "分析失败，请稍后重试",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function scrollToResult() {
    window.requestAnimationFrame(() => {
      document.getElementById("analysis-result")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <main id="main-content" className="min-h-dvh overflow-hidden">
      <AppHeader onLoadSample={loadSampleDemo} />
      <Hero onLoadSample={loadSampleDemo} />

      <div className="mx-auto max-w-7xl space-y-28 px-5 pb-24 sm:px-8 lg:px-10">
        <Steps />

        <section id="analyze" className="animate-enter scroll-mt-24" aria-labelledby="input-title">
          <div className="mb-8 max-w-2xl">
            <p className="section-kicker">开始分析</p>
            <h2 id="input-title" className="section-title">
              告诉 AI 你的经历与目标岗位
            </h2>
            <p className="section-description">
              上传简历并选择目标岗位，即可获得针对性的匹配分析与优化建议。
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ResumeUploader
              file={resumeFile}
              isSampleResume={isSampleResume}
              resumeText={resumeText}
              onFileChange={handleFileChange}
              onLoadSample={loadSampleDemo}
            />
            <JobSelector
              selectedJobId={selectedJobId}
              jobDescription={jobDescription}
              onJobChange={handleJobChange}
              onJobDescriptionChange={setJobDescription}
              onLoadJobDescription={loadSelectedJobDescription}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </section>

        <AnalysisResult
          result={analysisResult}
          isLoading={isAnalyzing}
          error={analysisError}
        />
      </div>

      <Footer />
    </main>
  );
}
