import { Bot, BookOpen, Globe2, Mail, Network, Rocket, Sparkles, Wrench, Beaker, type LucideIcon } from "lucide-react";
import type { Locale } from "@/src/config/site";

export type Section = { id: "about" | "features" | "lab" | "tools" | "assistant" | "community" | "knowledge" | "contact"; title: string; icon: LucideIcon; body?: string; cards?: string[] };
type Content = { metadata: { title: string; description: string; ogTitle: string }; nav: { label: string; href: string }[]; hero: { eyebrow: string; title: string; subtitle: string; cta: string }; sections: Section[]; footer: string; languageLabel: string; themeLabel: string };

const nav = (locale: Locale, labels: string[]) => [
  { label: labels[0], href: `/${locale}` }, { label: labels[1], href: `/${locale}/creator` }, { label: labels[2], href: `/${locale}/dashboard` }, { label: labels[3], href: `/${locale}/marketplace` }, { label: labels[4], href: `/${locale}/assistant` }, { label: labels[5], href: `/${locale}/lab` }, { label: labels[6], href: `/${locale}/tools` },
];

export const siteContent: Record<Locale, Content> = {
  en: {
    metadata: { title: "Enbang AI Creator Network v5 | Build ideas with AI", description: "A multilingual AI Creator Network for lab projects, tools, assistant workflows, creator networks, and knowledge publishing.", ogTitle: "Enbang AI Creator Network v5" },
    nav: nav("en", ["Home", "Creators", "Dashboard", "Marketplace", "Assistant", "AI Lab", "AI Tools"]),
    hero: { eyebrow: "Hello World 🌎", title: "Build ideas with AI.", subtitle: "Enbang AI Creator Network brings experiments, tools, assistant workflows, knowledge, and global creator collaboration into one launch-ready Next.js experience.", cta: "Enter AI Creator Network" },
    sections: [
      { id: "about", title: "AI Creator Network Architecture", icon: Rocket, body: "A modular studio built around AI Lab, Tools, Assistant, Creator Network, Knowledge Base, and Changelog routes." },
      { id: "features", title: "Studio entry points", icon: Sparkles, cards: ["Creators", "Dashboard", "Marketplace", "AI Assistant"] },
      { id: "lab", title: "AI Lab", icon: Beaker, body: "Track experiments with status, stack, progress, links, tags, and project detail pages." },
      { id: "tools", title: "AI Tools", icon: Wrench, body: "Search, filter, tag, categorize, and sort practical AI tools for creators." },
      { id: "assistant", title: "AI Assistant", icon: Bot, body: "A chat-first UI prepared for OpenAI API, RAG, and vector database integration." },
      { id: "community", title: "Creator Network", icon: Network, body: "Connect global creators through collaboration loops, rituals, and launch channels." },
      { id: "knowledge", title: "Knowledge Base", icon: BookOpen, body: "Markdown-style articles for architecture notes, workflows, and reusable AI methods." },
      { id: "contact", title: "Global-ready", icon: Mail, body: "Internationalized in English, Chinese, and Japanese with SEO metadata and hreflang alternates." },
    ],
    footer: "© 2026 Enbang AI Creator Network. Built for global AI creators.", languageLabel: "中文", themeLabel: "Toggle dark mode",
  },
  zh: {
    metadata: { title: "Enbang AI Creator Network v5 | 用 AI 构建想法", description: "面向 AI 实验、工具、助手、创作者网络与知识发布的多语言 AI Creator Network。", ogTitle: "Enbang AI Creator Network v5" },
    nav: nav("zh", ["首页", "创作者", "后台", "市场", "AI助手", "AI实验室", "AI工具"]),
    hero: { eyebrow: "Hello World 🌎", title: "Build ideas with AI.", subtitle: "Enbang AI Creator Network 将实验项目、工具库、助手工作流、知识库与全球创作者协作整合为一个可上线的 Next.js 体验。", cta: "进入 AI Creator Network" },
    sections: [
      { id: "about", title: "AI Creator Network 架构", icon: Rocket, body: "围绕 AI Lab、Tools、Assistant、Creator Network、Knowledge Base 与 Changelog 的模块化架构。" },
      { id: "features", title: "首页入口", icon: Sparkles, cards: ["Creators", "Dashboard", "Marketplace", "AI Assistant"] },
      { id: "lab", title: "AI实验室", icon: Beaker, body: "用状态、技术栈、进度、链接、标签与详情页管理 AI 项目。" },
      { id: "tools", title: "AI工具中心", icon: Wrench, body: "支持搜索、分类、标签与评分排序的 AI 工具数据库。" },
      { id: "assistant", title: "AI助手入口", icon: Bot, body: "先完成聊天 UI，并为 OpenAI API、RAG 与向量数据库预留架构。" },
      { id: "community", title: "Creator Network", icon: Network, body: "面向全球创作者的协作网络、发布节奏与增长闭环。" },
      { id: "knowledge", title: "知识库", icon: BookOpen, body: "用 Markdown 风格文章沉淀架构、工作流与可复用 AI 方法。" },
      { id: "contact", title: "国际化就绪", icon: Mail, body: "支持中文、English、日本語，并提供 SEO metadata 与 hreflang。" },
    ], footer: "© 2026 Enbang AI Creator Network。为全球 AI 创作者构建。", languageLabel: "日本語", themeLabel: "切换深色模式",
  },
  ja: {
    metadata: { title: "Enbang AI Creator Network v5 | AIでアイデアを形にする", description: "AI実験、ツール、アシスタント、クリエイターネットワーク、知識ベースを備えた多言語AI Creator Network。", ogTitle: "Enbang AI Creator Network v5" },
    nav: nav("ja", ["ホーム", "Creators", "Dashboard", "Marketplace", "Assistant", "AI Lab", "AI Tools"]),
    hero: { eyebrow: "Hello World 🌎", title: "Build ideas with AI.", subtitle: "Enbang AI Creator Network は実験、ツール、アシスタント、知識、グローバルなクリエイター協業を一つの Next.js 体験にまとめます。", cta: "AI Creator Networkへ" },
    sections: [
      { id: "about", title: "AI Creator Network Architecture", icon: Rocket, body: "AI Lab、Tools、Assistant、Creator Network、Knowledge Base、Changelog を中心にしたモジュール設計。" },
      { id: "features", title: "Studio entry points", icon: Sparkles, cards: ["Creators", "Dashboard", "Marketplace", "AI Assistant"] },
      { id: "lab", title: "AI実験室", icon: Beaker, body: "ステータス、スタック、進捗、リンク、タグ、詳細ページでプロジェクトを管理します。" },
      { id: "tools", title: "AIツールセンター", icon: Wrench, body: "検索、カテゴリ、タグ、評価順に対応したAIツールデータベース。" },
      { id: "assistant", title: "AIアシスタント", icon: Bot, body: "OpenAI API、RAG、Vector Database 接続に備えたチャットUI。" },
      { id: "community", title: "Creator Network", icon: Network, body: "世界中のクリエイターをつなぐ協業と公開のループ。" },
      { id: "knowledge", title: "Knowledge Base", icon: BookOpen, body: "Markdown形式の記事でAIワークフローと知識を蓄積します。" },
      { id: "contact", title: "グローバル対応", icon: Globe2, body: "中文、English、日本語、SEO metadata、hreflang に対応。" },
    ], footer: "© 2026 Enbang AI Creator Network. Global AI creators のために。", languageLabel: "English", themeLabel: "ダークモード切替",
  },
};
