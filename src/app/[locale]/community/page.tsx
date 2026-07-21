import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { type Locale } from "@/src/config/site";
import { getLocale } from "@/src/lib/i18n";
export const metadata: Metadata = { title: "Creator Network", description: "Global creator collaboration network for Enbang AI Studio." };
export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); const cards = ["Weekly AI build jams", "Multilingual launch swaps", "Tool reviews and workflow teardown", "Knowledge co-publishing"]; return <EcosystemPageShell locale={locale} eyebrow="Creator Network" title={locale === "zh" ? "全球创作者网络" : "Global Creator Network"} subtitle="A collaboration layer for creators building, publishing, and learning with AI across regions."><div className="grid gap-5 md:grid-cols-2">{cards.map((card) => <div key={card} className="rounded-3xl border border-white/15 bg-white/10 p-6 text-2xl font-black backdrop-blur-xl">{card}</div>)}</div></EcosystemPageShell>; }
