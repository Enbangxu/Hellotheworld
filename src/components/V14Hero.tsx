"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

const examples = [
  "Create a startup idea",
  "Design a website",
  "Build an app concept",
  "Write a story",
];

export function V14Hero() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [idea, setIdea] = useState("");
  const [example, setExample] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setExample((value) => (value + 1) % examples.length), 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  function startCreating(event: FormEvent) {
    event.preventDefault();
    const value = idea.trim() || examples[example];
    router.push(`/create?idea=${encodeURIComponent(value)}`);
  }

  return (
    <section id="home" className="v12-hero relative z-10 flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-10">
      <div className="ai-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="relative mx-auto w-full max-w-5xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 backdrop-blur-xl"><Sparkles size={16} /> V14 · Create with AI</span>
        <h1 className="mt-7 text-5xl font-black leading-none tracking-[-.06em] text-white sm:text-7xl lg:text-8xl">Hello the <span className="v12-title-gradient">world</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-300 sm:text-2xl">Your first AI creation space</p>
        <form onSubmit={startCreating} className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-[1.5rem] border border-white/15 bg-white/[.08] p-3 shadow-2xl shadow-violet-950/40 backdrop-blur-2xl sm:flex-row">
          <label className="sr-only" htmlFor="hero-idea">What would you like to create?</label>
          <input id="hero-idea" value={idea} onChange={(event) => setIdea(event.target.value)} maxLength={2000} className="min-h-14 flex-1 rounded-xl bg-slate-950/60 px-5 text-base text-white outline-none ring-cyan-300 transition placeholder:text-slate-400 focus:ring-2 sm:text-lg" placeholder={examples[example]} />
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} type="submit" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-violet-300 px-6 font-black text-slate-950">Create with AI <ArrowRight size={19} /></motion.button>
        </form>
        <div className="mt-5 h-6 overflow-hidden text-sm text-slate-400" aria-live="polite">
          <motion.p key={example} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>Try “{examples[example]}”</motion.p>
        </div>
      </motion.div>
    </section>
  );
}
