"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/src/config/site";
import { agents } from "@/src/data/ai-universe";
import { AgentCard } from "@/src/components/AgentCard";

export function AgentMarketplace({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(agents.map((agent) => agent.category)))];
  const filtered = useMemo(() => agents.filter((agent) => {
    const matchesCategory = category === "All" || agent.category === category;
    const haystack = `${agent.name} ${agent.description} ${agent.creatorName} ${agent.category}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);

  return <div className="space-y-6"><div className="grid gap-3 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-[1fr_auto]"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search agents, creators, categories..." className="rounded-2xl border border-white/15 bg-slate-950/50 px-4 py-3 font-semibold text-white outline-none placeholder:text-slate-400" /><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-black transition ${category === item ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-white hover:bg-white/20"}`}>{item}</button>)}</div></div><div className="grid gap-5 md:grid-cols-2">{filtered.map((agent) => <AgentCard key={agent.id} agent={agent} locale={locale} />)}</div>{filtered.length === 0 ? <p className="rounded-3xl border border-white/15 bg-white/10 p-6 text-slate-200">No agents found. Try a different search or category.</p> : null}</div>;
}
