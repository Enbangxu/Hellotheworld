import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { creators } from "@/src/data/network";
import { creators as creatorEconomy } from "@/src/data/ai-universe";
import { getLocale } from "@/src/lib/i18n";
import type { Locale } from "@/src/config/site";

export const metadata: Metadata = { title: "Creator Economy", description: "Creator profiles, badges, rankings, published agents, and followers in Enbang AI Universe V6." };

export default async function CreatorIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = getLocale(rawLocale);

  return (
    <EcosystemPageShell locale={locale} eyebrow="Creator Economy" title="Creator profiles for AI builders" subtitle="Explore creator badges, rankings, published agents, followers, skills, projects, articles, tools, and collaboration links across Enbang AI Universe V6.">
      <div className="grid gap-5 md:grid-cols-2">
        {creators.map((creator) => (
          <Link key={creator.username} href={`/${locale}/creator/${creator.username}`} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-300 text-2xl font-black text-slate-950">{creator.displayName.charAt(0)}</div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-200">@{creator.username}</p>
                <h2 className="text-2xl font-black">{creator.displayName}</h2>
              </div>
            </div>
            <p className="mt-4 text-slate-200">{creator.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">{creator.skills.map((skill) => <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{skill}</span>)}</div>
            {(() => { const economy = creatorEconomy.find((item) => item.name === creator.displayName); return economy ? <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm font-bold"><span className="rounded-2xl bg-cyan-300/90 p-3 text-slate-950">#{economy.ranking}<br />Rank</span><span className="rounded-2xl bg-white/10 p-3">{economy.agents}<br />Agents</span><span className="rounded-2xl bg-white/10 p-3">{economy.followers}<br />Followers</span><span className="col-span-3 rounded-2xl bg-fuchsia-300/20 p-3 text-fuchsia-100">{economy.badge} badge</span></div> : null; })()}
          </Link>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
