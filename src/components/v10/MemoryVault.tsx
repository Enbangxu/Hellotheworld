"use client";
import { useState } from "react";
import { BrainCircuit, Database, Plus, Search, ShieldCheck } from "lucide-react";
import { memorySeeds } from "@/src/data/v10";

export function MemoryVault() {
  const [memories, setMemories] = useState(memorySeeds);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const visible = memories.filter((memory) => memory.content.toLowerCase().includes(query.toLowerCase()) || memory.type.toLowerCase().includes(query.toLowerCase()));
  function remember() { if (!draft.trim()) return; setMemories([{ type: "Note", content: draft.trim(), date: "Just now" }, ...memories]); setDraft(""); }
  return <div>
    <div className="grid gap-4 sm:grid-cols-3">{[[Database, "Vector-ready", "Embeddings prepared for similarity search"], [BrainCircuit, "RAG architecture", "Memories can ground assistant responses"], [ShieldCheck, "User controlled", "Transparent, editable personal context"]].map(([Icon, title, body]) => { const ItemIcon = Icon as typeof Database; return <div key={title as string} className="rounded-3xl border border-white/15 bg-white/10 p-5"><ItemIcon className="text-cyan-200" /><h2 className="mt-4 font-black">{title as string}</h2><p className="mt-1 text-sm text-slate-300">{body as string}</p></div>; })}</div>
    <div className="mt-6 rounded-3xl border border-white/15 bg-slate-950/45 p-5"><label className="font-black" htmlFor="memory">Add a memory</label><div className="mt-3 flex gap-3"><input id="memory" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Something your AI should remember…" className="min-w-0 flex-1 rounded-2xl bg-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-300"/><button onClick={remember} className="rounded-2xl bg-cyan-300 px-5 font-black text-slate-950"><Plus /></button></div></div>
    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/10 px-4"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search personal memory" className="w-full bg-transparent py-4 outline-none" /></div>
    <div className="mt-4 space-y-3">{visible.map((memory, index) => <article key={`${memory.content}-${index}`} className="rounded-3xl border border-white/10 bg-white/5 p-5"><div className="flex justify-between gap-4"><span className="rounded-full bg-violet-400/20 px-3 py-1 text-xs font-black text-violet-200">{memory.type}</span><time className="text-xs text-slate-400">{memory.date}</time></div><p className="mt-4 text-slate-100">{memory.content}</p></article>)}</div>
  </div>;
}
