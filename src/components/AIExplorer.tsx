"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { SmartImage } from "@/src/components/SmartImage";

const suggestions = ["Plan a sustainable weekend in Kyoto", "为零基础用户设计 AI 学习路线", "Write a product launch story"];
type ChatResult = { title: string; content: string; suggestions: string[]; image: { keyword: string; imageUrl: string; alt: string } };

export function AIExplorer() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<ChatResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function explore(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim() || loading) return;
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error?.message ?? "Exploration failed");
      setResult(body.data);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Exploration failed"); }
    finally { setLoading(false); }
  }

  return <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 lg:px-10" aria-labelledby="ai-explorer-title">
    <div className="glass-card rounded-[2rem] p-6 sm:p-9">
      <div className="flex items-center gap-3 text-violet-300"><Sparkles /><span className="text-xs font-black uppercase tracking-[.24em]">V9 AI Explorer</span></div>
      <h2 id="ai-explorer-title" className="mt-4 text-3xl font-black sm:text-5xl">Ask. Discover. Create.</h2>
      <p className="mt-3 text-slate-300">Turn one question into useful knowledge, visual context, and your next creation.</p>
      <form onSubmit={explore} className="mt-7 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="ai-prompt" className="sr-only">What do you want to explore?</label>
        <input id="ai-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} maxLength={1000} placeholder="What do you want to explore?" className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-slate-950/50 px-5 py-4 text-white outline-none ring-violet-400 transition placeholder:text-slate-500 focus:ring-2" />
        <button disabled={loading || !prompt.trim()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 font-black text-white disabled:opacity-50">{loading ? <LoaderCircle className="animate-spin" /> : <Sparkles />} AI Explore</button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">{suggestions.map((item) => <button key={item} onClick={() => setPrompt(item)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-white/10">{item}</button>)}</div>
      {error && <p role="alert" className="mt-5 rounded-xl bg-rose-500/15 p-4 text-rose-200">{error}</p>}
      {result && <article className="mt-7 grid overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 md:grid-cols-[.8fr_1.2fr]">
        <SmartImage content={`${prompt} ${result.image.keyword}`} className="min-h-56" />
        <div className="p-6"><p className="text-xs font-black uppercase tracking-widest text-cyan-300">AI discovery</p><h3 className="mt-2 text-2xl font-black">{result.title}</h3><p className="mt-4 whitespace-pre-line leading-7 text-slate-300">{result.content}</p><div className="mt-5 flex flex-wrap gap-2">{result.suggestions.map((item) => <button key={item} onClick={() => setPrompt(item)} className="rounded-full bg-white/10 px-3 py-2 text-xs">{item}</button>)}</div><Link href={`/create?prompt=${encodeURIComponent(prompt)}`} className="mt-6 inline-flex items-center gap-2 font-black text-violet-300">Create from this idea <ArrowRight size={17} /></Link></div>
      </article>}
    </div>
  </section>;
}
