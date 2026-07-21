import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { ProjectsExplorer } from "@/src/components/ecosystem/ProjectsExplorer";
import { siteConfig, type Locale } from "@/src/config/site";
import { getLocale } from "@/src/lib/i18n";

export const metadata: Metadata = { title: "AI Lab", description: "AI experiments with project lists, detail pages, progress, stacks, links, and tag filters." };
export default async function LabPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); const copy = locale === "zh" ? { eyebrow: "AI Lab", title: "AI 实验室", subtitle: "跟踪 AI 项目状态、技术栈、进度、链接与标签。", all: "全部" } : locale === "ja" ? { eyebrow: "AI Lab", title: "AI実験室", subtitle: "AIプロジェクトの状態、技術スタック、進捗、リンク、タグを管理します。", all: "All" } : { eyebrow: "AI Lab", title: "AI Studio Project Lab", subtitle: "Track AI experiments with status, stack, progress, links, tags, and detail pages.", all: "All" }; return <EcosystemPageShell locale={locale} {...copy}><ProjectsExplorer locale={locale} allLabel={copy.all} /></EcosystemPageShell>; }
export function generateStaticParams() { return siteConfig.locales.map((locale) => ({ locale })); }
