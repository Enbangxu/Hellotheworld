"use client";

import { useMemo, useState } from "react";
import { creatorTools, toolCategories, toolTags } from "@/src/data/tools";

export function ToolsExplorer({ labels }: { labels: { search: string; all: string; category: string; tags: string } }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(labels.all);
  const [tag, setTag] = useState(labels.all);

  const filteredTools = useMemo(() => creatorTools.filter((tool) => {
    const matchesQuery = [tool.name, tool.description, tool.category, ...tool.tags].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === labels.all || tool.category === category;
    const matchesTag = tag === labels.all || tool.tags.includes(tag);
    return matchesQuery && matchesCategory && matchesTag;
  }), [category, labels.all, query, tag]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-3">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} className="rounded-2xl border border-white/15 bg-slate-950/40 px-4 py-3 font-semibold text-white outline-none placeholder:text-slate-400" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-white/15 bg-slate-950/40 px-4 py-3 font-semibold text-white outline-none" aria-label={labels.category}>
          {[labels.all, ...toolCategories].map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={tag} onChange={(event) => setTag(event.target.value)} className="rounded-2xl border border-white/15 bg-slate-950/40 px-4 py-3 font-semibold text-white outline-none" aria-label={labels.tags}>
          {[labels.all, ...toolTags].map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {filteredTools.map((tool) => (
          <a key={tool.name} href={tool.url} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-200">{tool.category}</p>
            <h2 className="mt-3 text-2xl font-black">{tool.name}</h2>
            <p className="mt-3 text-slate-200">{tool.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">{tool.tags.map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">#{item}</span>)}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
