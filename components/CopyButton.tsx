"use client";

import { useEffect, useRef, useState } from "react";
import { designSystem } from "@/lib/designSystem";

type CopyStatus = "idle" | "copied" | "failed";

type CopyButtonProps = {
  text: string;
  className?: string;
};

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setStatus("idle");
    }, 1500);
  }

  const labels: Record<CopyStatus, string> = {
    idle: "复制",
    copied: "已复制",
    failed: "复制失败",
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      aria-live="polite"
      className={`${designSystem.components.secondaryButton} min-h-10 shrink-0 px-3 py-2 text-sm ${className}`}
    >
      {labels[status]}
    </button>
  );
}
