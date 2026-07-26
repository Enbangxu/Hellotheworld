"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { SmartImage } from "@/src/components/SmartImage";
import type { Locale } from "@/src/config/site";

const copy = {
  en: { badge: "V9 is live · AI content platform", title: "What will you discover today?", description: "Ask one question. Get a useful answer, matched visual, and a direct path to creating something new.", placeholder: "Ask about a destination, topic, product, or idea…", action: "Explore with AI", result: "Your AI discovery", create: "Turn this into content", suggestions: ["Plan a sustainable weekend in Kyoto", "Design an AI learning roadmap for beginners", "Write a product launch story"] },
  zh: { badge: "V9 正式上线 · AI 内容平台", title: "今天，你想探索什么？", description: "输入一个问题，即可获得智能答案、匹配图片，并继续创作完整内容。", placeholder: "输入目的地、学习主题、产品或创意…", action: "开始 AI 探索", result: "AI 探索结果", create: "基于结果继续创作", suggestions: ["规划一个可持续的京都周末旅行", "为零基础用户设计 AI 学习路线", "撰写一篇产品发布故事"] },
  ja: { badge: "V9 公開 · AI コンテンツプラットフォーム", title: "今日は何を探しますか？", description: "質問ひとつで、AIの回答、関連画像、コンテンツ作成への道筋が得られます。", placeholder: "場所、学習テーマ、製品、アイデアを入力…", action: "AIで探索", result: "AI探索結果", create: "この内容から作成", suggestions: ["京都で持続可能な週末旅行を計画する", "初心者向けAI学習ロードマップを作る", "製品ローンチストーリーを書く"] },
} satisfies Record<Locale, { badge: string; title: string; description: string; placeholder: string; action: string; result: string; create: string; suggestions: string[] }>;
type ChatResult = { title: string; content: string; suggestions: string[]; image: { keyword: string; imageUrl: string; alt: string } };

export function AIExplorer({ locale }: { locale: Locale }) {
  const text = copy[locale];
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

  return <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-10 lg:px-10" aria-labelledby="ai-explorer-title">
    <div className="mb-8 text-center"><div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100"><Sparkles size={16} />{text.badge}</div><h1 id="ai-explorer-title" className="mx-auto mt-6 max-w-4xl text-5xl font-black tracking-[-.05em] sm:text-7xl">{text.title}</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">{text.description}</p></div>
    <div className="glass-card rounded-[2rem] p-6 sm:p-9">
      <form onSubmit={explore} className="mt-7 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="ai-prompt" className="sr-only">What do you want to explore?</label>
        <input id="ai-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} maxLength={1000} placeholder={text.placeholder} className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-slate-950/50 px-5 py-4 text-white outline-none ring-violet-400 transition placeholder:text-slate-500 focus:ring-2" />
        <button disabled={loading || !prompt.trim()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 font-black text-white shadow-lg shadow-violet-950/40 disabled:opacity-50">{loading ? <LoaderCircle className="animate-spin" /> : <Sparkles />} {text.action}</button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">{text.suggestions.map((item) => <button key={item} onClick={() => setPrompt(item)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-white/10">{item}</button>)}</div>
      {error && <p role="alert" className="mt-5 rounded-xl bg-rose-500/15 p-4 text-rose-200">{error}</p>}
      {result && <article className="mt-7 grid overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 md:grid-cols-[.8fr_1.2fr]">
        <SmartImage content={`${prompt} ${result.image.keyword}`} className="min-h-56" />
        <div className="p-6"><p className="text-xs font-black uppercase tracking-widest text-cyan-300">{text.result}</p><h3 className="mt-2 text-2xl font-black">{result.title}</h3><p className="mt-4 whitespace-pre-line leading-7 text-slate-300">{result.content}</p><div className="mt-5 flex flex-wrap gap-2">{result.suggestions.map((item) => <button key={item} onClick={() => setPrompt(item)} className="rounded-full bg-white/10 px-3 py-2 text-xs">{item}</button>)}</div><Link href={`/create?prompt=${encodeURIComponent(prompt)}`} className="mt-6 inline-flex items-center gap-2 font-black text-violet-300">{text.create} <ArrowRight size={17} /></Link></div>
      </article>}
    </div>
  </section>;
}
