export const designSystem = {
  colors: {
    background: "#0B1220",
    primary: "#3B82F6",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    border: "rgba(255, 255, 255, 0.10)",
    surface: "rgba(255, 255, 255, 0.05)",
  },
  spacing: {
    section: "space-y-24",
    card: "p-6 sm:p-8",
    grid: "gap-6",
  },
  components: {
    card:
      "rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_36px_rgba(2,6,23,0.28)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-white/[0.07] hover:shadow-[0_18px_52px_rgba(59,130,246,0.14)]",
    primaryButton:
      "min-h-12 cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-blue-400 hover:to-cyan-400 hover:shadow-[0_14px_36px_rgba(59,130,246,0.32)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none",
    secondaryButton:
      "min-h-12 cursor-pointer rounded-xl border border-white/10 bg-gradient-to-r from-white/10 to-white/[0.06] px-5 py-3 font-semibold text-slate-100 shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-400/30 hover:from-blue-500/15 hover:to-cyan-400/10 hover:shadow-[0_12px_30px_rgba(59,130,246,0.16)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none",
    input:
      "min-h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition-all duration-300 ease-out placeholder:text-slate-500 hover:border-blue-400/40 hover:bg-white/[0.07] hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] focus:border-blue-400 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/15 focus:shadow-[0_0_28px_rgba(59,130,246,0.12)]",
    tag: "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-200 hover:shadow-[0_8px_20px_rgba(59,130,246,0.12)]",
  },
} as const;

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
