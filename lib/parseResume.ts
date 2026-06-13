import "server-only";

export const MAX_RESUME_FILE_SIZE = 4 * 1024 * 1024;

const supportedExtensions = new Set(["pdf", "docx"]);

export class ResumeParseError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
  ) {
    super(message);
    this.name = "ResumeParseError";
  }
}

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function isSupportedResumeFile(file: File) {
  return supportedExtensions.has(getFileExtension(file.name));
}

function assertFileCanBeParsed(file: File) {
  if (!isSupportedResumeFile(file)) {
    throw new ResumeParseError("当前仅支持 PDF / DOCX 格式简历");
  }

  if (file.size > MAX_RESUME_FILE_SIZE) {
    throw new ResumeParseError("简历文件过大，请上传小于 4 MB 的 PDF 或 DOCX 文件", 413);
  }
}

async function parsePdf(arrayBuffer: ArrayBuffer) {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });

  try {
    const result = await parser.getText();
    const text = result.text.trim();

    if (!text) {
      throw new ResumeParseError(
        "未能从 PDF 中提取文字。若这是扫描版简历，请转换为可复制文字的 PDF 或 DOCX 后重试",
      );
    }

    return text;
  } catch (error) {
    if (error instanceof ResumeParseError) {
      throw error;
    }

    if (error instanceof Error && error.name === "PasswordException") {
      throw new ResumeParseError("该 PDF 已加密，请移除密码保护后重新上传");
    }

    if (
      error instanceof Error &&
      ["InvalidPDFException", "FormatError"].includes(error.name)
    ) {
      throw new ResumeParseError("PDF 文件已损坏或格式异常，请重新导出后上传");
    }

    console.error("PDF parse failed:", error);
    throw new ResumeParseError("PDF 简历解析失败，请重新导出为标准 PDF 或改用 DOCX");
  } finally {
    try {
      await parser.destroy();
    } catch (error) {
      console.warn("PDF parser cleanup failed:", error);
    }
  }
}

async function parseDocx(arrayBuffer: ArrayBuffer) {
  try {
    const mammothModule = await import("mammoth");
    const result = await mammothModule.default.extractRawText({
      buffer: Buffer.from(arrayBuffer),
    });
    const text = result.value.trim();

    if (!text) {
      throw new ResumeParseError("DOCX 简历中未提取到文字，请检查文件内容后重试");
    }

    return text;
  } catch (error) {
    if (error instanceof ResumeParseError) {
      throw error;
    }

    console.error("DOCX parse failed:", error);
    throw new ResumeParseError("DOCX 简历解析失败，请重新保存为标准 DOCX 后上传");
  }
}

export async function parseResumeFile(file: File) {
  assertFileCanBeParsed(file);

  const extension = getFileExtension(file.name);
  const arrayBuffer = await file.arrayBuffer();

  return extension === "pdf" ? parsePdf(arrayBuffer) : parseDocx(arrayBuffer);
}
