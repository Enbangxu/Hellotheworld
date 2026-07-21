import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { ToolsExplorer } from "@/src/components/ecosystem/ToolsExplorer";
import { type Locale } from "@/src/config/site";
import { getLocale } from "@/src/lib/i18n";

export const metadata: Metadata = { title: "AI Tools", description: "Search, categorize, tag, and sort AI creator tools." };
export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); const copy = locale === "zh" ? { eyebrow: "AI Tools", title: "AI 工具中心", subtitle: "按关键词、分类、标签与评分排序筛选 AI 工具。", labels: { search: "搜索工具、描述或标签", all: "全部", category: "分类", tags: "标签", sort: "排序" } } : locale === "ja" ? { eyebrow: "AI Tools", title: "AIツールセンター", subtitle: "キーワード、カテゴリ、タグ、評価でAIツールを探せます。", labels: { search: "Search tools", all: "All", category: "Category", tags: "Tags", sort: "Sort" } } : { eyebrow: "AI Tools", title: "AI Tools Center", subtitle: "Search, categorize, tag, and sort practical tools for modern AI creators.", labels: { search: "Search tools, descriptions, or tags", all: "All", category: "Category", tags: "Tags", sort: "Sort" } }; return <EcosystemPageShell locale={locale} eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle}><ToolsExplorer labels={copy.labels} /></EcosystemPageShell>; }
