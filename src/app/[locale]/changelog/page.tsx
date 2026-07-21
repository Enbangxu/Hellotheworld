import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { type Locale } from "@/src/config/site";
import { changelog } from "@/src/data/changelog";
import { getLocale } from "@/src/lib/i18n";
export const metadata: Metadata = { title: "Changelog", description: "Version history for Enbang AI Studio." };
export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); return <EcosystemPageShell locale={locale} eyebrow="Changelog" title={locale === "zh" ? "版本记录" : "Version Changelog"} subtitle="Track shipped AI Studio upgrades without losing project history."><div className="space-y-5">{changelog.map((item) => <article key={item.version} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"><p className="text-sm font-black text-cyan-200">{item.version} · {item.date}</p><h2 className="mt-3 text-2xl font-black">{item.title}</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-200">{item.notes.map((note) => <li key={note}>{note}</li>)}</ul></article>)}</div></EcosystemPageShell>; }
