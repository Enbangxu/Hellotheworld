import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { marketplaceProducts } from "@/src/data/network";
import { getLocale } from "@/src/lib/i18n";
import type { Locale } from "@/src/config/site";

export const metadata: Metadata = { title: "AI Marketplace", description: "AI tools, prompts, and templates from the Hello the World creator network." };

export default async function MarketplacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = getLocale(rawLocale);
  return <EcosystemPageShell locale={locale} eyebrow="Marketplace" title="AI tools, prompts, and templates" subtitle="Buy and discover creator-made AI products with clear pricing, categories, and creator attribution."><div className="grid gap-5 md:grid-cols-3">{marketplaceProducts.map((product) => <a key={product.name} href={product.url} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"><p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-200">{product.category}</p><h2 className="mt-3 text-2xl font-black">{product.name}</h2><p className="mt-3 text-slate-200">{product.description}</p><div className="mt-5 flex items-center justify-between"><span className="text-2xl font-black text-cyan-200">{product.price}</span><span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold">@{product.creator}</span></div></a>)}</div></EcosystemPageShell>;
}
