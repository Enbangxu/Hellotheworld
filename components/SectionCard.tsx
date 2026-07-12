import type { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";

type SectionCardProps = {
  id: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export function SectionCard({ id, title, icon: Icon, children }: SectionCardProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <GlassCard className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-fit rounded-2xl bg-slate-900/10 p-3 text-indigo-600 ring-1 ring-slate-900/10 dark:bg-white/15 dark:text-cyan-200 dark:ring-white/20">
            <Icon size={28} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">{title}</h2>
        </div>
        <div className="text-lg leading-8 text-slate-700 dark:text-slate-200">{children}</div>
      </GlassCard>
    </section>
  );
}
