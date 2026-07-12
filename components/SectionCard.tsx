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
    <section id={id} className="scroll-mt-24">
      <GlassCard className="mx-auto max-w-4xl">
        <div className="mb-5 flex items-center gap-4">
          <div className="rounded-2xl bg-white/15 p-3 text-cyan-200 ring-1 ring-white/20">
            <Icon size={28} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        </div>
        <div className="text-lg leading-8 text-slate-200">{children}</div>
      </GlassCard>
    </section>
  );
}
