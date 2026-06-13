import "server-only";

import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

const supportedExtensions = new Set(["pdf", "docx"]);

export class UnsupportedResumeFormatError extends Error {
  constructor() {
    super("当前仅支持 PDF / DOCX 格式简历");
    this.name = "UnsupportedResumeFormatError";
  }
}

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function isSupportedResumeFile(file: File) {
  return supportedExtensions.has(getFileExtension(file.name));
}

export async function parseResumeFile(file: File) {
  const extension = getFileExtension(file.name);

  if (!supportedExtensions.has(extension)) {
    throw new UnsupportedResumeFormatError();
  }

  const arrayBuffer = await file.arrayBuffer();

  if (extension === "pdf") {
    const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });

    try {
      const result = await parser.getText();
      return result.text.trim();
    } finally {
      await parser.destroy();
    }
  }

  const result = await mammoth.extractRawText({
    buffer: Buffer.from(arrayBuffer),
  });

  return result.value.trim();
}
