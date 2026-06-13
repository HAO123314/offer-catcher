"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/Card";
import { designSystem } from "@/lib/designSystem";

type ResumeUploaderProps = {
  file: File | null;
  isSampleResume: boolean;
  resumeText: string;
  onFileChange: (file: File | null) => void;
  onLoadSample: () => void;
};

export function ResumeUploader({
  file,
  isSampleResume,
  resumeText,
  onFileChange,
  onLoadSample,
}: ResumeUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const hasResume = isSampleResume || Boolean(file);

  function isSupportedResume(selectedFile: File) {
    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    return extension === "pdf" || extension === "docx";
  }

  function handleSelectedFile(selectedFile: File | null) {
    if (!selectedFile) {
      return;
    }

    if (!isSupportedResume(selectedFile)) {
      setError("当前仅支持 PDF / DOCX 格式简历");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    setError("");
    onFileChange(selectedFile);
  }

  function clearFile() {
    setError("");
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function loadSample() {
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onLoadSample();
  }

  function formatFileSize(size: number) {
    if (size < 1024 * 1024) {
      return `${Math.max(1, Math.round(size / 1024))} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <Card as="article" className="group relative flex min-h-[36rem] flex-col overflow-hidden p-6 hover:border-blue-400/25 sm:p-8">
      <div aria-hidden="true" className="absolute left-0 top-0 h-36 w-36 rounded-full bg-blue-500/10 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
            Resume Engine
          </span>
          <h3 className="mt-5 text-2xl font-bold text-slate-50">注入简历上下文</h3>
          <p className="mt-2 leading-7 text-slate-400">
            上传简历后，AI 将提取经历、技能与求职亮点。
          </p>
        </div>
        <div className="hidden rounded-xl border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-300 sm:block">
          PDF / DOCX
        </div>
      </div>

      <label
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleSelectedFile(event.dataTransfer.files?.[0] ?? null);
        }}
        className={`relative mt-7 flex min-h-64 flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 ease-out focus-within:ring-4 focus-within:ring-blue-500/15 ${
          isDragging
            ? "border-blue-300 bg-blue-500/15 shadow-[0_0_45px_rgba(59,130,246,0.2)]"
            : "border-white/10 bg-white/[0.03] hover:border-blue-400/50 hover:bg-blue-500/10 hover:shadow-[0_0_38px_rgba(59,130,246,0.12)]"
        }`}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept=".pdf,.docx"
          onChange={(event) =>
            handleSelectedFile(event.target.files?.[0] ?? null)
          }
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300 shadow-lg shadow-blue-500/10 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-blue-300/40 group-hover:shadow-[0_12px_30px_rgba(59,130,246,0.22)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7"
          >
            <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
          </svg>
        </span>
        <span className="relative mt-5 font-semibold text-slate-100">
          {isDragging
            ? "释放文件，注入 Resume Engine"
            : hasResume
              ? "更换简历文件"
              : "拖拽简历到这里，或点击选择文件"}
        </span>
        <span className="relative mt-2 text-sm text-slate-400">
          文件仅用于本次分析，不会长期保存
        </span>
      </label>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300"
        >
          {error}
        </div>
      )}

      {file && (
        <div className="relative mt-5 flex items-center justify-between gap-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-4 shadow-lg shadow-blue-950/20">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/15 text-xs font-bold uppercase text-blue-300">
              {file.name.split(".").pop()}
            </span>
            <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                Resume Context Ready
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-100">
              {file.name}
            </p>
              <p className="mt-1 text-xs text-slate-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className={`${designSystem.components.secondaryButton} min-h-10 px-3 py-2 text-sm hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300`}
          >
            清除
          </button>
        </div>
      )}

      {isSampleResume && (
        <div
          role="status"
          className="relative mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-sm font-semibold text-emerald-300 shadow-lg shadow-emerald-950/10"
        >
          已加载示例简历
          <span className="ml-2 font-normal text-emerald-400">
            共 {resumeText.length} 字
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={loadSample}
        className={`${designSystem.components.secondaryButton} relative mt-5`}
      >
        一键使用示例简历
      </button>
    </Card>
  );
}
