import Link from "next/link";
import { ArrowRight, Bot, BookOpen, ImageIcon, Sparkles, Users } from "lucide-react";
import type { Locale } from "@/src/config/site";
import { AIEntry } from "@/src/components/AIEntry";
import { MobileBottomNav } from "@/src/components/MobileBottomNav";
import { Navbar } from "@/src/components/Navbar";

type HomeCopy = { subtitle: string; cta: string; core: Array<{ title: string; description: string }> };
const copy: Record<Locale, HomeCopy> = {
  zh: { subtitle: "AI创造未来，从这里开始", cta: "开始探索AI", core: [{ title: "AI助手", description: "对话、学习与探索知识" }, { title: "AI Studio", description: "把灵感变成新的作品" }, { title: "AI Community", description: "与全球创作者一起成长" }] },
  en: { subtitle: "Create the future with AI, starting here", cta: "Explore AI", core: [{ title: "AI Assistant", description: "Chat, learn, and explore knowledge" }, { title: "AI Studio", description: "Turn an idea into something new" }, { title: "AI Community", description: "Grow with creators worldwide" }] },
  ja: { subtitle: "AIで未来を創る、ここから始めよう", cta: "AIを探索する", core: [{ title: "AIアシスタント", description: "対話し、学び、知識を探索" }, { title: "AI Studio", description: "アイデアを新しい作品へ" }, { title: "AI Community", description: "世界のクリエイターと成長" }] },
};

export function HomePage({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const prefix = `/${locale}`;
  const entries = [
    { ...content.core[0], href: `${prefix}/assistant`, icon: Bot },
    { ...content.core[1], href: "/studio", icon: Sparkles },
    { ...content.core[2], href: `${prefix}/community`, icon: Users },
    { title: locale === "zh" ? "AI 图片生成" : locale === "ja" ? "AI画像生成" : "AI Image Creator", description: locale === "zh" ? "用文字创造你的专属视觉作品" : locale === "ja" ? "言葉からオリジナル画像を作成" : "Turn words into original visual art", href: "/create", icon: ImageIcon },
    { title: locale === "zh" ? "初三 AI 学习" : locale === "ja" ? "中学3年 AI 学習" : "Grade 9 AI Learning", description: locale === "zh" ? "七科知识点，按章节系统学习" : locale === "ja" ? "7教科を体系的に学ぶ" : "Seven subjects with complete lessons", href: `${prefix}/knowledge`, icon: BookOpen },
  ];

  return (
    <main className="minimal-home min-h-screen bg-slate-950 pb-24 text-white md:pb-0">
      <Navbar locale={locale} />
      <div className="minimal-glow" aria-hidden="true" />
      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-12 pt-32 text-center sm:pt-36">
        <p className="text-xs font-bold uppercase tracking-[.28em] text-cyan-300">V23 · Adaptive Learning</p>
        <h1 className="mt-5 text-5xl font-black tracking-[-.055em] sm:text-7xl">Hello the World</h1>
        <p className="mt-5 text-lg text-slate-300 sm:text-xl">{content.subtitle}</p>
        <Link href={`${prefix}/assistant`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">{content.cta}<ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
      <div className="relative mx-auto max-w-6xl px-5"><AIEntry locale={locale} /></div>
      <section className="relative mx-auto grid max-w-6xl gap-3 px-5 py-10 sm:grid-cols-2 lg:grid-cols-5" aria-label="Core AI experiences">
        {entries.map(({ title, description, href, icon: Icon }) => (
          <Link key={title} href={href} className="minimal-core-card">
            <Icon size={24} className="text-cyan-300" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            <ArrowRight className="mt-5 text-slate-500" size={18} aria-hidden="true" />
          </Link>
        ))}
      </section>
      <footer className="relative border-t border-white/10 px-5 py-6 text-center text-xs text-slate-500">V23 · Adaptive Learning</footer>
      <MobileBottomNav locale={locale} />
    </main>
  );
}
