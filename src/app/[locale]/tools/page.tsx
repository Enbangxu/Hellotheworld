import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { ToolsExplorer } from "@/src/components/ecosystem/ToolsExplorer";
import { type Locale } from "@/src/config/site";
import { getLocale } from "@/src/lib/i18n";

export const metadata: Metadata = { title: "AI Tools", description: "Search, categorize, and filter AI creator tools." };

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = getLocale(rawLocale);
  const copy = locale === "zh"
    ? { eyebrow: "AI Tools", title: "AI 工具库", subtitle: "按分类、关键词和标签筛选创作者需要的 AI 工具。", labels: { search: "搜索工具、描述或标签", all: "全部", category: "分类", tags: "标签" } }
    : { eyebrow: "AI Tools", title: "AI Tools Directory", subtitle: "Search, categorize, and filter practical tools for modern AI creators.", labels: { search: "Search tools, descriptions, or tags", all: "All", category: "Category", tags: "Tags" } };

  return <EcosystemPageShell locale={locale} eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle}><ToolsExplorer labels={copy.labels} /></EcosystemPageShell>;
}
