import type { Metadata } from "next";
import { AgentMarketplace } from "@/src/components/agents/AgentMarketplace";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { type Locale } from "@/src/config/site";
import { getLocale } from "@/src/lib/i18n";
export const metadata: Metadata = { title: "AI Agent Marketplace", description: "Discover AI agents by category, creator, rating, and download count in Enbang AI Universe V6." };
export default async function AgentsPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); return <EcosystemPageShell locale={locale} eyebrow="AI Agent Marketplace" title={locale === "zh" ? "AI Agent 市场" : locale === "ja" ? "AIエージェント市場" : "AI Agent Marketplace"} subtitle="Search agent listings by category, inspect creator information, ratings, prompt intent, and download traction."><AgentMarketplace locale={locale} /></EcosystemPageShell>; }
