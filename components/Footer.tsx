export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/[0.02] px-5 py-10 backdrop-blur-xl sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 text-sm leading-6 text-slate-500 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div>
          <p className="font-bold text-slate-300">Offer 捕手</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-600">
            AI Resume × JD Matching Agent
          </p>
        </div>
        <div className="space-y-1 md:text-right">
          <p>上传的简历仅用于本次匹配分析，Demo 不会长期保存你的简历文件。</p>
          <p>AI 分析结果仅供求职准备参考，不代表真实企业筛选结果。</p>
        </div>
      </div>
    </footer>
  );
}
