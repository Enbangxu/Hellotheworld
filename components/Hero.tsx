"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

export function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <GlassCard className="relative max-w-5xl overflow-hidden px-6 py-14 sm:px-12 sm:py-20">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100"
        >
          <Sparkles size={16} /> Built with Next.js 15
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gradient text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl"
        >
          Hello the world
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-200 sm:text-2xl"
        >
          Welcome to my first website.
        </motion.p>
        <motion.a
          href="#about"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-cyan-300 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_0_45px_rgba(103,232,249,0.75)] transition hover:bg-white"
        >
          Explore <ArrowDown size={20} />
        </motion.a>
      </GlassCard>
    </section>
  );
}
