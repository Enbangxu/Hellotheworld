import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { type Locale } from "@/src/config/site";
import { knowledgeArticles } from "@/src/data/knowledge";
import { getLocale } from "@/src/lib/i18n";
export const metadata: Metadata = { title: "Knowledge Base", description: "Markdown articles for Enbang AI Studio." };
export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); return <EcosystemPageShell locale={locale} eyebrow="Knowledge Base" title={locale === "zh" ? "知识库" : "Knowledge Base"} subtitle="Markdown-style articles with title, summary, content, tags, and date."><div className="grid gap-6 md:grid-cols-2">{knowledgeArticles.map((article) => <article key={article.slug} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"><time className="text-sm font-semibold text-cyan-200">{article.date}</time><h2 className="mt-3 text-2xl font-black">{article.title}</h2><p className="mt-3 text-slate-200">{article.summary}</p><pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-slate-950/35 p-4 text-sm leading-7 text-slate-200">{article.content}</pre></article>)}</div></EcosystemPageShell>; }
