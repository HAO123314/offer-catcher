import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Offer 捕手",
  description: "面向学生求职场景的 AI 岗位匹配智能体",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="bg-[#0B1220]">
      <body className="min-h-dvh bg-[#0B1220]">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl border border-blue-400/30 bg-[#0B1220] px-4 py-3 text-sm font-semibold text-blue-200 shadow-lg transition-transform duration-300 focus:translate-y-0"
        >
          跳转到主要内容
        </a>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#0B1220]" />

          <div className="background-grid absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]" />

          <div className="absolute -left-48 -top-64 h-[42rem] w-[42rem] rounded-full bg-blue-500/20 blur-[140px]" />
          <div className="absolute -right-52 top-[12%] h-[38rem] w-[38rem] rounded-full bg-cyan-400/15 blur-[150px]" />
          <div className="absolute bottom-[-22rem] left-[35%] h-[44rem] w-[44rem] rounded-full bg-indigo-500/10 blur-[160px]" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,7,18,0.58)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-400/[0.04] to-transparent" />
        </div>

        <div className="relative z-10 min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
