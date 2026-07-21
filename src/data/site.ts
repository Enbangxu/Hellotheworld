import { Beaker, Globe2, Mail, Rocket, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import type { Locale } from "@/src/config/site";

export type Section = {
  id: "about" | "features" | "lab" | "tools" | "global" | "contact";
  title: string;
  icon: LucideIcon;
  body?: string;
  cards?: string[];
};

export const siteContent: Record<Locale, {
  metadata: { title: string; description: string; ogTitle: string };
  nav: { label: string; href: string }[];
  hero: { eyebrow: string; title: string; subtitle: string; cta: string };
  sections: Section[];
  footer: string;
  languageLabel: string;
  themeLabel: string;
}> = {
  en: {
    metadata: {
      title: "Hello the World | Production Ready Next.js Website",
      description: "A bilingual, SEO-ready Next.js website foundation with polished motion, clean architecture, and production deployment workflows.",
      ogTitle: "Hello the World — Production Ready Website",
    },
    nav: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Features", href: "#features" },
      { label: "AI Lab", href: "/en/lab" },
      { label: "AI Tools", href: "/en/tools" },
      { label: "Global Creator", href: "/en/global" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Hello the World v3",
      title: "Build a warmer web presence.",
      subtitle: "A production-ready Next.js foundation with bilingual content, SEO metadata, animated interactions, and a clean path to launch on Vercel.",
      cta: "Explore the foundation",
    },
    sections: [
      { id: "about", title: "About", icon: Rocket, body: "Hello the World is a refined website starter for curious builders, travelers, and dreamers. It pairs thoughtful content structure with delightful motion so every visitor feels invited to explore." },
      { id: "features", title: "Production features", icon: Sparkles, cards: ["SEO metadata and social sharing", "Bilingual English and Chinese URLs", "Motion-first responsive components"] },
      { id: "lab", title: "AI Lab", icon: Beaker, body: "Explore markdown-backed research notes, AI workflow experiments, and creator strategy essays for the new AI Creator Ecosystem." },
      { id: "tools", title: "AI Tools", icon: Wrench, body: "Discover a searchable directory of practical AI tools with categories and tag filters for creators." },
      { id: "global", title: "Global Creator", icon: Globe2, body: "Build for global audiences with bilingual switching, SEO metadata, and hreflang-ready pages." },
      { id: "contact", title: "Contact", icon: Mail, body: "Use this section as a launchpad for email, social links, newsletter signup, or a future contact form as the website continues to grow." },
    ],
    footer: "© 2026 Hello the World. Built for launch.",
    languageLabel: "中文",
    themeLabel: "Toggle dark mode",
  },
  zh: {
    metadata: {
      title: "Hello the World | 可上线的 Next.js 网站",
      description: "一个支持中英双语、SEO、现代动效、清晰架构与 Vercel 部署流程的 Next.js 网站基础版本。",
      ogTitle: "Hello the World — 可上线的网站基础",
    },
    nav: [
      { label: "首页", href: "#home" },
      { label: "关于", href: "#about" },
      { label: "功能", href: "#features" },
      { label: "AI Lab", href: "/zh/lab" },
      { label: "AI Tools", href: "/zh/tools" },
      { label: "Global Creator", href: "/zh/global" },
      { label: "联系", href: "#contact" },
    ],
    hero: {
      eyebrow: "Hello the World v3",
      title: "打造更有温度的网络名片。",
      subtitle: "一个可直接上线的 Next.js 网站基础：支持双语内容、SEO 元数据、细腻交互动效，并为 Vercel 部署做好准备。",
      cta: "探索网站基础",
    },
    sections: [
      { id: "about", title: "关于", icon: Globe2, body: "Hello the World 是为创作者、旅行者和探索者准备的精致网站起点。它结合清晰的内容结构与愉悦的动效，让访客自然地开始探索。" },
      { id: "features", title: "上线能力", icon: Sparkles, cards: ["SEO 元数据与社交分享", "英文与中文的清晰 URL", "以动效驱动的响应式组件"] },
      { id: "lab", title: "AI Lab", icon: Beaker, body: "沉淀 Markdown 研究文章、AI 工作流实验与创作者策略，构建新的 AI Creator Ecosystem。" },
      { id: "tools", title: "AI Tools", icon: Wrench, body: "提供可搜索、可分类、可按标签过滤的 AI 工具目录，服务创作者日常工作。" },
      { id: "global", title: "Global Creator", icon: Globe2, body: "通过中英文切换、SEO metadata 与 hreflang 页面，面向全球受众发布内容。" },
      { id: "contact", title: "联系", icon: Mail, body: "这里可以扩展为邮箱、社交链接、订阅入口，或未来的联系表单，伴随网站持续成长。" },
    ],
    footer: "© 2026 Hello the World。为上线而构建。",
    languageLabel: "English",
    themeLabel: "切换深色模式",
  },
};
