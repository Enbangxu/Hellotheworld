import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { type Locale } from "@/src/config/site";
import { workspaceModules } from "@/src/data/ai-universe";
import { getLocale } from "@/src/lib/i18n";
export const metadata: Metadata = { title: "AI Workspace", description: "Projects, prompts, conversations, knowledge files, and sharing for Enbang AI Universe V6." };
export default async function WorkspacePage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); return <EcosystemPageShell locale={locale} eyebrow="AI Workspace" title={locale === "zh" ? "AI 工作空间" : locale === "ja" ? "AIワークスペース" : "AI Workspace"} subtitle="A collaborative hub for user projects, saved prompts, AI conversations, knowledge files, and shared workspaces."><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{workspaceModules.map((item) => <article key={item.title} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"><h2 className="text-2xl font-black text-cyan-100">{item.title}</h2><p className="mt-3 text-slate-200">{item.body}</p></article>)}</div></EcosystemPageShell>; }
