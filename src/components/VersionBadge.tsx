import { Sparkles } from "lucide-react";

export function VersionBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-slate-950/35 px-4 py-2 text-left text-white shadow-lg shadow-violet-500/10 backdrop-blur-xl">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400"><Sparkles size={17} aria-hidden="true" /></span>
      <span><strong className="block text-sm font-black tracking-wide">V14.0</strong><span className="block text-[10px] font-bold uppercase tracking-[.13em] text-cyan-100">Latest Upgrade: AI Creation Universe · AI 创作宇宙</span></span>
    </div>
  );
}
