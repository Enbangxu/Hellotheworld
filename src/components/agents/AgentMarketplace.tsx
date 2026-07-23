"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/src/config/site";
import { agents } from "@/src/data/ai-universe";

export function AgentMarketplace({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(agents.map((agent) => agent.category)))];
  const filtered = useMemo(() => agents.filter((agent) => {
    const matchesCategory = category === "All" || agent.category === category;
    const haystack = `${agent.name} ${agent.description} ${agent.creatorName} ${agent.category}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);

  return <div className="space-y-6"><div className="grid gap-3 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-[1fr_auto]"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search agents, creators, categories..." className="rounded-2xl border border-white/15 bg-slate-950/50 px-4 py-3 font-semibold text-white outline-none placeholder:text-slate-400" /><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-black transition ${category === item ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-white hover:bg-white/20"}`}>{item}</button>)}</div></div><div className="grid gap-5 md:grid-cols-2">{filtered.map((agent) => <Link key={agent.id} href={`/${locale}/agents/${agent.id}`} className="group rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/60 hover:bg-white/15"><div className="flex items-start justify-between gap-4"><span className="rounded-full bg-cyan-300/90 px-3 py-1 text-xs font-black text-slate-950">{agent.category}</span><span className="text-sm font-bold text-amber-200">★ {agent.rating}</span></div><h2 className="mt-5 text-2xl font-black group-hover:text-cyan-200">{agent.name}</h2><p className="mt-3 text-slate-200">{agent.description}</p><div className="mt-5 flex flex-wrap justify-between gap-3 text-sm font-bold text-slate-300"><span>By {agent.creatorName}</span><span>{agent.downloads.toLocaleString()} downloads</span></div></Link>)}</div>{filtered.length === 0 ? <p className="rounded-3xl border border-white/15 bg-white/10 p-6 text-slate-200">No agents found. Try a different search or category.</p> : null}</div>;
}
