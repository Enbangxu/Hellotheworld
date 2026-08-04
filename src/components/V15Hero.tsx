"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AIGreeting } from "@/src/components/AIGreeting";
import { AIChat } from "@/src/components/AIChat";
import { UserLevel } from "@/src/components/UserLevel";
import { WorldBackground } from "@/src/components/WorldBackground";

export function V15Hero() {
  const reduceMotion = useReducedMotion();
  const [chatOpen, setChatOpen] = useState(false);

  return <section id="home" className="v15-hero relative z-10 flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-10">
    <div className="ai-grid" aria-hidden="true" />
    <WorldBackground />
    <div className="hero-orb hero-orb-one" aria-hidden="true" />
    <div className="hero-orb hero-orb-two" aria-hidden="true" />
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} className="relative mx-auto w-full max-w-5xl text-center">
      <div className="flex flex-wrap items-center justify-center gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 backdrop-blur-xl"><Sparkles size={16} /> V18 · AI Knowledge Graph</span><UserLevel /></div>
      <AIGreeting />
      <h1 className="mt-7 text-5xl font-black leading-none tracking-[-.06em] text-white sm:text-7xl lg:text-8xl">Hello the <span className="v12-title-gradient">world</span></h1>
      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-2xl">让每一次 AI 对话成为知识入口。识别关键概念、连接关系图谱，沿着好奇心探索未来。</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><Link href="#ai-recommendation" className="v15-primary">开始探索 <ArrowRight size={19} /></Link><button type="button" onClick={() => setChatOpen(true)} className="v15-secondary"><Bot size={20} /> 与 DeepSeek 对话</button></div>
    </motion.div>
    <AIChat open={chatOpen} onOpenChange={setChatOpen} />
  </section>;
}
