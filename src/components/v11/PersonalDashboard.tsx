"use client";

import { motion } from "framer-motion";
import { Bot, Brain, Compass, PenTool, Sunrise } from "lucide-react";

const cards = [
  { icon: Sunrise, label: "Daily AI Brief", value: "6 signals", body: "Agentic workflows, multimodal creation, and personal knowledge systems are leading your brief." },
  { icon: Bot, label: "AI Agent Status", value: "3 active", body: "Strategy Copilot and RAG Architect are ready. Learning Mentor completed its weekly plan." },
  { icon: PenTool, label: "Creation History", value: "12 creations", body: "Your latest work includes a launch narrative, product roadmap, and three shared prompts." },
  { icon: Brain, label: "Memory Summary", value: "28 memories", body: "You focus on multilingual creator tools, grounded RAG, and concise visual plans." },
  { icon: Compass, label: "Recommended", value: "8 for you", body: "Explore a memory-aware companion and remix this week's top community agent." },
];

export function PersonalDashboard() {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">{cards.map((card, index) => <motion.article key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -5 }} className={`rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}><card.icon className="text-cyan-200" /><p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-cyan-200">{card.label}</p><p className="mt-2 text-3xl font-black">{card.value}</p><p className="mt-3 leading-7 text-slate-200">{card.body}</p></motion.article>)}</div>;
}
