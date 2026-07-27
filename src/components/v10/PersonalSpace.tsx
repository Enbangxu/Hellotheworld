"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Brain, Clock3, Lightbulb, Send, Sparkles } from "lucide-react";
import { recommendationCatalog } from "@/src/data/v10";

const creations = ["Multilingual launch story", "RAG product blueprint", "Tokyo creative guide"];
const activity = ["Saved a memory about source quality", "Created Product Story", "Followed RAG Architect"];

export function PersonalSpace({ locale }: { locale: string }) {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Good morning. I connected your recent ideas, memories, and projects. What should we move forward today?");
  function ask() {
    if (!message.trim()) return;
    setReply(`I’ll help you turn “${message.trim()}” into a focused plan using your saved context.`);
    setMessage("");
  }
  return <div className="grid gap-5 lg:grid-cols-12">
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-cyan-300/20 bg-slate-950/55 p-6 lg:col-span-8">
      <div className="flex items-center gap-3"><span className="rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 p-3"><Bot /></span><div><p className="font-black">World Assistant</p><p className="text-sm text-emerald-300">Your context is connected</p></div></div>
      <p className="mt-6 min-h-24 rounded-3xl border border-white/10 bg-white/5 p-5 text-lg leading-8 text-slate-100">{reply}</p>
      <div className="mt-4 flex gap-3"><input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && ask()} placeholder="Ask your world anything…" className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-slate-400 focus:border-cyan-300" /><button onClick={ask} className="rounded-2xl bg-cyan-300 px-5 text-slate-950" aria-label="Send"><Send size={20} /></button></div>
    </motion.section>
    <Panel icon={Brain} title="Knowledge vault" className="lg:col-span-4"><p className="text-4xl font-black">128</p><p className="mt-1 text-slate-300">connected memories</p><Link href={`/${locale}/memory`} className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-200">Open memory <ArrowUpRight size={16} /></Link></Panel>
    <Panel icon={Sparkles} title="Your creations" className="lg:col-span-4">{creations.map((item) => <p className="mt-3 rounded-xl bg-white/5 p-3" key={item}>{item}</p>)}</Panel>
    <Panel icon={Clock3} title="Activity timeline" className="lg:col-span-4">{activity.map((item) => <div className="mt-3 flex gap-3 text-sm" key={item}><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-400" /><p>{item}</p></div>)}</Panel>
    <Panel icon={Lightbulb} title="Recommended next" className="lg:col-span-4">{recommendationCatalog.slice(0, 2).map((item) => <div className="mt-3" key={item.id}><p className="font-bold">{item.title}</p><p className="text-xs text-cyan-200">{item.reason}</p></div>)}</Panel>
  </div>;
}

function Panel({ icon: Icon, title, children, className }: { icon: typeof Brain; title: string; children: React.ReactNode; className?: string }) {
  return <motion.section whileHover={{ y: -4 }} className={`rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl ${className ?? ""}`}><div className="flex items-center gap-2 text-cyan-200"><Icon size={20} /><h2 className="font-black">{title}</h2></div><div className="mt-5">{children}</div></motion.section>;
}
