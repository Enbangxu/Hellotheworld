"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Brain, ChartNoAxesCombined, Heart, Newspaper, Orbit, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { FloatingBlobs } from "@/src/components/FloatingBlobs";
import { Navbar } from "@/src/components/Navbar";
import { agents, creators, networkStats } from "@/src/data/network";
import { siteContent } from "@/src/data/site";
import { getAlternateLocale } from "@/src/lib/i18n";
import type { Locale } from "@/src/config/site";
import { PersonalDashboard } from "@/src/components/v11/PersonalDashboard";

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

        <section id="home" className="relative z-10 mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-6 pb-20 pt-36 lg:grid-cols-[1.08fr_.92fr] lg:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-700 backdrop-blur dark:text-violet-200">
              <Sparkles size={16} /> V11 · AI Life Ecosystem
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[.96] tracking-[-0.055em] sm:text-7xl xl:text-8xl">
              Your life.<br /><span className="text-gradient">Intelligently connected.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">One living AI ecosystem for your daily brief, memory, agents, creations, community, and personal recommendations.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={`${prefix}/dashboard`} className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-violet-500/30 dark:bg-white dark:text-slate-950">Open your dashboard <ArrowRight className="transition group-hover:translate-x-1" size={19} /></Link>
              <Link href={`${prefix}/agents`} className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-7 py-4 font-black backdrop-blur transition hover:-translate-y-1 hover:bg-white dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"><Search size={19} /> Explore agents</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-7 text-sm text-slate-500 dark:text-slate-400">
              {heroStats.map((stat) => <div key={stat.label}><strong className="block text-2xl font-black text-slate-950 dark:text-white">{stat.value}</strong>{stat.label}</div>)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .8, delay: .15 }} className="relative mx-auto w-full max-w-xl">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="absolute -inset-12 rounded-full border border-dashed border-cyan-300/30"><Orbit className="absolute -top-3 left-1/2 text-cyan-300" /></motion.div>
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-violet-500/20 to-cyan-400/20 blur-3xl" />
            <div className="glass-card relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
              <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-500">Creator cockpit</p><h2 className="mt-1 text-xl font-black">Build something alive</h2></div><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white"><Sparkles /></span></div>
              <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-2xl dark:bg-white/10">
                <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600"><Bot /></span><div><p className="font-black">Launch Copilot</p><p className="text-sm text-slate-400">Strategy · Content · Analytics</p></div><span className="ml-auto rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Live</span></div>
                <div className="mt-5 grid grid-cols-3 gap-2">{["Plan", "Create", "Measure"].map((item, index) => <div key={item} className="rounded-xl bg-white/5 p-3 text-center"><div className="mx-auto mb-2 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" style={{ width: `${55 + index * 16}%` }} /><span className="text-xs font-bold">{item}</span></div>)}</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4"><div className="rounded-2xl border border-slate-900/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"><ChartNoAxesCombined className="mb-4 text-cyan-500" /><p className="text-2xl font-black">+28%</p><p className="text-xs text-slate-500 dark:text-slate-400">Weekly reach</p></div><div className="rounded-2xl border border-slate-900/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"><Heart className="mb-4 text-pink-500" /><p className="text-2xl font-black">1.4k</p><p className="text-xs text-slate-500 dark:text-slate-400">Community saves</p></div></div>
            </div>
          </motion.div>
        </section>

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

        <footer className="relative z-10 border-t border-slate-900/10 px-6 py-8 text-center text-sm font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">Hello the world · V11 AI Life Ecosystem · Remember, connect, create, evolve.</footer>
      </div>
    </main>
  );
}
