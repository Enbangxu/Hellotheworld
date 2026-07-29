import Link from "next/link";
import { ArrowUpRight, Brain, Compass, Layers3, Orbit, Sparkles, Users } from "lucide-react";
import type { ExploreItem } from "@/src/data/siteContent";

const icons = { compass: Compass, sparkles: Sparkles, brain: Brain, users: Users, orbit: Orbit, layers: Layers3 };

export function ExploreCard({ item, locale }: { item: ExploreItem; locale: string }) {
  const Icon = icons[item.icon];
  return (
    <Link href={`/${locale}${item.route}`} className="explore-card group relative overflow-hidden rounded-[2rem] p-7" aria-label={`Explore ${item.title}`}>
      <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-2xl transition duration-500 group-hover:scale-150 group-hover:opacity-40`} />
      <div className="relative">
        <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}><Icon aria-hidden="true" /></span>
        <h3 className="mt-8 text-2xl font-black tracking-tight">{item.title}</h3>
        <p className="mt-3 min-h-20 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[.16em] text-violet-600 dark:text-violet-300">Enter world <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={17} /></span>
      </div>
    </Link>
  );
}
