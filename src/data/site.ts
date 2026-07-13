import { Globe2, Mail, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import type { Locale } from "@/src/config/site";

export type Section = {
  id: "about" | "features" | "contact";
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
      { id: "contact", title: "联系", icon: Mail, body: "这里可以扩展为邮箱、社交链接、订阅入口，或未来的联系表单，伴随网站持续成长。" },
    ],
    footer: "© 2026 Hello the World。为上线而构建。",
    languageLabel: "English",
    themeLabel: "切换深色模式",
  },
};
