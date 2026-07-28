"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Agent } from "@/src/data/ai-universe";
import type { Locale } from "@/src/config/site";

export function AgentCard({ agent, locale }: { agent: Agent; locale: Locale }) {
  return <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280 }} className="h-full rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"><div className="flex items-start justify-between gap-4"><span className="rounded-full bg-cyan-300/90 px-3 py-1 text-xs font-black text-slate-950">{agent.category}</span><span className="text-sm font-bold text-amber-200">★ {agent.rating}</span></div><h2 className="mt-5 text-2xl font-black">{agent.name}</h2><p className="mt-3 text-slate-200">{agent.description}</p><div className="mt-5 flex justify-between gap-3 text-sm font-bold text-slate-300"><span>By {agent.creatorName}</span><span>{agent.downloads.toLocaleString()} uses</span></div><Link href={`/${locale}/agents/${agent.id}`} className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 font-black transition hover:bg-cyan-300 hover:text-slate-950">View agent →</Link></motion.article>;
}
