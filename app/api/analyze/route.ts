import { NextResponse } from "next/server";
import { AIAnalyzeError, callDeepSeekAnalyze } from "@/lib/ai";
import {
  isSupportedResumeFile,
  parseResumeFile,
  UnsupportedResumeFormatError,
} from "@/lib/parseResume";

export const runtime = "nodejs";
export const maxDuration = 60;

function errorResponse(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function getTextField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
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

    if (resumeFile && !isSupportedResumeFile(resumeFile)) {
      return errorResponse("当前仅支持 PDF / DOCX 格式简历");
    }

    const resumeText =
      providedResumeText || (resumeFile ? await parseResumeFile(resumeFile) : "");

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
    if (error instanceof UnsupportedResumeFormatError) {
      return errorResponse(error.message);
    }

    if (error instanceof AIAnalyzeError) {
      return errorResponse(error.message, error.status);
    }

    console.error("Analyze request failed:", error);
    return errorResponse("分析失败，请检查文件格式或稍后重试", 500);
  }
}
