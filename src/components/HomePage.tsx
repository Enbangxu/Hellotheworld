"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, ChartNoAxesCombined, Newspaper, Sparkles } from "lucide-react";
import { useState } from "react";
import { FloatingBlobs } from "@/src/components/FloatingBlobs";
import { Navbar } from "@/src/components/Navbar";
import { agents, creators, networkStats } from "@/src/data/network";
import { siteContent } from "@/src/data/site";
import { getAlternateLocale } from "@/src/lib/i18n";
import type { Locale } from "@/src/config/site";
import { PersonalDashboard } from "@/src/components/v11/PersonalDashboard";
import { ExploreCard } from "@/src/components/ExploreCard";
import { VersionBadge } from "@/src/components/VersionBadge";
import { v12Content } from "@/src/data/siteContent";
import { CreationUniversePreview } from "@/src/components/v14/CreationUniversePreview";

const heroStats = [
  { label: "Creators", value: networkStats.users },
  { label: "Projects", value: networkStats.projects },
  { label: "Agent launches", value: networkStats.clicks },
];

const featureCards = [
  { icon: ChartNoAxesCombined, title: "AI Dashboard 2.0", body: "Begin every day with your AI brief, live agent status, creation history, memory summary, and recommendations.", href: "/dashboard", color: "from-violet-500 to-fuchsia-500" },
  { icon: Brain, title: "Living Memory", body: "Build user-controlled memory designed for semantic retrieval, grounded answers, and personal context.", href: "/memory", color: "from-cyan-500 to-blue-500" },
  { icon: Newspaper, title: "Community Intelligence", body: "Discover AI artwork, exchange prompts, share agents, and find recommendations tuned to you.", href: "/community", color: "from-orange-400 to-pink-500" },
];

export function HomePage({ locale }: { locale: Locale }) {
  const [isDark, setIsDark] = useState(true);
  const content = siteContent[locale];
  const alternateLocale = getAlternateLocale(locale);
  const prefix = `/${locale}`;
  const v7Nav = [
    { label: "AI Creative Lab", href: "/create" },
    { label: "Discover", href: "/discover" },
    { label: "Dashboard", href: `${prefix}/dashboard` },
    { label: "Memory", href: `${prefix}/memory` },
    { label: "Daily Feed", href: `${prefix}/feed` },
    { label: "Agents", href: `${prefix}/agents` },
  ];

  return (
    <main className={`${isDark ? "dark" : ""} min-h-screen overflow-hidden`}>
      <div className="animated-gradient min-h-screen text-slate-950 transition-colors dark:text-white">
        <FloatingBlobs />
        <Navbar isDark={isDark} navItems={v7Nav} languageHref={`/${alternateLocale}`} languageLabel={content.languageLabel} themeLabel={content.themeLabel} onToggleTheme={() => setIsDark((value) => !value)} />

        <section id="home" className="v12-hero relative z-10 flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-36 lg:px-10">
          <div className="ai-grid" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" />
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="relative mx-auto w-full max-w-7xl text-center">
            <VersionBadge />
            <p className="mt-9 text-sm font-black uppercase tracking-[.38em] text-cyan-200">{v12Content.hero.eyebrow}</p>
            <h1 className="mx-auto mt-5 max-w-5xl text-6xl font-black leading-[.88] tracking-[-.07em] text-white sm:text-8xl lg:text-[8.5rem]">
              {v12Content.hero.lines.map((line, index) => <span key={line} className={index === 1 ? "v12-title-gradient block" : "block"}>{line}</span>)}
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{v12Content.hero.description}</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#explore-v12" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-slate-950 shadow-2xl transition hover:-translate-y-1 hover:shadow-cyan-400/30">{v12Content.hero.primaryCta} <ArrowRight className="transition group-hover:translate-x-1" size={19} /></Link>
              <Link href="/create" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"><Sparkles size={19} /> {v12Content.hero.secondaryCta}</Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-7 text-sm text-slate-400">{heroStats.map((stat) => <div key={stat.label}><strong className="block text-2xl font-black text-white">{stat.value}</strong>{stat.label}</div>)}</div>
          </motion.div>
        </section>

        <section id="explore-v12" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-24 lg:px-10">
          <div className="mx-auto mb-12 max-w-3xl text-center"><p className="font-black uppercase tracking-[.22em] text-cyan-500">{v12Content.explore.eyebrow}</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{v12Content.explore.title}</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{v12Content.explore.description}</p></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{v12Content.explore.items.map((item) => <ExploreCard key={item.title} item={item} locale={locale} />)}</div>
        </section>

        <CreationUniversePreview />

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="creative-glass p-8 text-white"><p className="font-black uppercase tracking-[.2em] text-cyan-300">V13 · AI Creative Lab</p><h2 className="mt-3 text-4xl font-black">一个想法，创造一个世界</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{["会保存居民梦境的未来城市","帮助人养成习惯的温暖 App","规则每次都会改变的探索游戏"].map((title)=><article key={title} className="rounded-2xl bg-white/10 p-5"><Sparkles/><h3 className="mt-3 font-bold">{title}</h3></article>)}</div><Link href="/create" className="creative-primary mt-7">进入 AI 创造实验室 <ArrowRight/></Link></div></section>

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div className="max-w-3xl"><p className="font-black uppercase tracking-[.2em] text-cyan-500">AI Personal Dashboard 2.0</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">V11 is live — and visible.</h2><p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">See the five signals that organize your AI life, then open the full dashboard to manage the ecosystem.</p></div><Link href={`${prefix}/dashboard`} className="rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">Explore Dashboard 2.0 →</Link></div>
          <PersonalDashboard />
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 max-w-2xl"><p className="font-black uppercase tracking-[.2em] text-violet-500">One creative network</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Everything your ideas need.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">{featureCards.map(({ icon: Icon, title, body, href, color }, index) => <motion.div key={title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="glass-card group rounded-[2rem] p-7 transition hover:-translate-y-2"><span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}><Icon /></span><h3 className="mt-7 text-2xl font-black">{title}</h3><p className="mt-3 min-h-20 leading-7 text-slate-600 dark:text-slate-300">{body}</p><Link href={`${prefix}${href}`} className="mt-6 inline-flex items-center gap-2 font-black text-violet-600 dark:text-violet-300">Explore <ArrowRight size={17} /></Link></motion.div>)}</div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-black uppercase tracking-[.2em] text-cyan-500">Made by the network</p><h2 className="mt-3 text-4xl font-black tracking-tight">Meet trending agents.</h2></div><Link href={`${prefix}/marketplace`} className="font-black">View marketplace →</Link></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">{agents.map((agent) => <article key={agent.name} className="rounded-[1.75rem] border border-slate-900/10 bg-white/65 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/35"><div className="flex items-start justify-between"><span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-600 dark:text-violet-300">{agent.category}</span><span className="font-bold text-amber-500">★ {agent.rating}</span></div><h3 className="mt-6 text-2xl font-black">{agent.name}</h3><p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{agent.description}</p><p className="mt-6 text-sm font-bold text-slate-500">by {agent.creator}</p></article>)}</div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-14 text-center text-white shadow-2xl sm:px-14"><div className="mx-auto mb-6 flex -space-x-3">{creators.slice(0, 4).map((creator, index) => <span key={creator.username} className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-950 bg-gradient-to-br from-violet-500 to-cyan-400 font-black" style={{ zIndex: 4-index }}>{creator.displayName.charAt(0)}</span>)}</div><h2 className="text-4xl font-black tracking-tight sm:text-5xl">Your next idea deserves a network.</h2><p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">Create your profile, ship an agent, and find the people who will help it grow.</p><Link href="/register" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-slate-950 transition hover:scale-105">Join the creator network <ArrowRight size={18} /></Link></div></section>

        <footer className="relative z-10 border-t border-slate-900/10 px-6 py-8 text-center text-sm font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">Hello the world · V14 AI Creation Universe</footer>
      </div>
    </main>
  );
}
