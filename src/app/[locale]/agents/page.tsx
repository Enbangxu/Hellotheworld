import type { Metadata } from "next";
import { AgentMarketplace } from "@/src/components/agents/AgentMarketplace";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { type Locale } from "@/src/config/site";
import { getLocale } from "@/src/lib/i18n";
import Link from "next/link";
export const metadata: Metadata = { title: "AI Agent Marketplace", description: "Discover AI agents by category, creator, rating, and download count in Enbang AI Universe V6." };
export default async function AgentsPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); return <EcosystemPageShell locale={locale} eyebrow="AI Agent Marketplace" title={locale === "zh" ? "AI Agent 市场" : locale === "ja" ? "AIエージェント市場" : "AI Agent Marketplace"} subtitle="Discover focused agents by category, creator, rating, and real-world usage."><div className="mb-6 flex justify-end"><Link href={`/${locale}/agents/create`} className="rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">+ Create an agent</Link></div><AgentMarketplace locale={locale} /></EcosystemPageShell>; }
