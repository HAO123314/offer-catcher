import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@napi-rs/canvas", "mammoth", "pdf-parse"],
  outputFileTracingIncludes: {
    "/api/analyze": [
      "./node_modules/@napi-rs/canvas/**/*",
      "./node_modules/@napi-rs/canvas-linux-x64-gnu/**/*",
      "./node_modules/@napi-rs/canvas-linux-x64-musl/**/*",
      "./node_modules/pdfjs-dist/legacy/build/**/*",
    ],
  },
};

export default nextConfig;
