import { designSystem } from "@/lib/designSystem";

type AppHeaderProps = {
  onLoadSample: () => void;
};

export function AppHeader({ onLoadSample }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0B1220]/75 px-5 backdrop-blur-2xl sm:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-500/25 to-cyan-400/10 text-sm font-bold text-blue-200 shadow-lg shadow-blue-500/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-blue-300/40 group-hover:shadow-[0_10px_28px_rgba(59,130,246,0.2)]">
            O
          </span>
          <div>
            <p className="text-sm font-bold text-slate-100">Offer 捕手</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              AI Career Intelligence
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主要导航">
          {[
            { label: "工作流", href: "#workflow" },
            { label: "开始分析", href: "#analyze" },
            { label: "AI Report", href: "#analysis-result" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-white/[0.06] hover:text-slate-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            DeepSeek Powered
          </span>
          <button
            type="button"
            onClick={onLoadSample}
            className={`${designSystem.components.secondaryButton} min-h-9 px-3 py-2 text-sm`}
          >
            体验 Demo
          </button>
        </div>
      </div>
    </header>
  );
}
