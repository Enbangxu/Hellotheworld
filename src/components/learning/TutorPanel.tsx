"use client";

import { useState } from "react";
import type { Locale } from "@/src/config/site";
import type { TutorMode, TutorResponse } from "@/src/lib/learning-schema";

type TutorCopy = {
  provider: string; title: string; inputLabel: string; placeholder: string;
  loading: string; fallback: string; insight: string; actions: Record<TutorMode, string>;
};
const copy: Record<Locale, TutorCopy> = {
  zh: { provider: "AI 导师由 DeepSeek V4 Flash 提供", title: "继续追问", inputLabel: "输入问题或答案", placeholder: "输入你的问题或答案…", loading: "正在连接 DeepSeek 导师并整理答案…", fallback: "AI 导师暂时不可用。", insight: "关键", actions: { ask: "用提问引导我", simplify: "再简单一点", analogy: "换个生活类比", example: "给我一道例题", quiz: "生成一道新题", diagnose: "检查我的答案" } },
  en: { provider: "AI tutor powered by DeepSeek V4 Flash", title: "Keep learning", inputLabel: "Enter a question or answer", placeholder: "Type your question or answer…", loading: "Connecting to the DeepSeek tutor and preparing an answer…", fallback: "The AI tutor is temporarily unavailable.", insight: "Key insight", actions: { ask: "Guide me with questions", simplify: "Make it simpler", analogy: "Use another analogy", example: "Give me an example", quiz: "Create a new question", diagnose: "Check my answer" } },
  ja: { provider: "AIチューター：DeepSeek V4 Flash", title: "さらに質問する", inputLabel: "質問または解答を入力", placeholder: "質問または解答を入力…", loading: "DeepSeekチューターに接続し、回答を整理しています…", fallback: "AIチューターは一時的に利用できません。", insight: "重要ポイント", actions: { ask: "質問で導いて", simplify: "もっと簡単に", analogy: "別の例えで", example: "例題を出して", quiz: "新しい問題を作る", diagnose: "解答を確認して" } },
};
const modes: TutorMode[] = ["simplify", "analogy", "example", "ask", "quiz", "diagnose"];

export function TutorPanel({ topicId, locale }: { topicId: string; locale: Locale }) {
  const content = copy[locale];
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<TutorResponse>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const run = async (mode: TutorMode) => {
    setLoading(true); setError(""); setResult(undefined);
    try {
      const response = await fetch("/api/learning/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ locale, topicId, mode, question, userAnswer: mode === "diagnose" ? question : undefined }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message);
      setResult(data);
    } catch (reason) { setError(reason instanceof Error ? reason.message : content.fallback); }
    finally { setLoading(false); }
  };
  return <aside className="rounded-3xl border border-violet-400/30 bg-slate-900 p-5 sm:p-6" aria-labelledby="tutor-title"><p className="text-xs font-bold text-violet-300">{content.provider}</p><h2 id="tutor-title" className="mt-2 text-2xl font-black">{content.title}</h2><textarea value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={1000} aria-label={content.inputLabel} placeholder={content.placeholder} className="mt-4 min-h-24 w-full rounded-xl border border-white/20 bg-slate-950 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300"/><div className="mt-3 grid grid-cols-2 gap-2">{modes.map((mode) => <button disabled={loading} type="button" key={mode} onClick={() => run(mode)} className="rounded-xl bg-violet-500/20 p-3 text-sm font-bold hover:bg-violet-500/30 disabled:opacity-50">{content.actions[mode]}</button>)}</div>{loading && <p role="status" className="mt-4 text-slate-300">{content.loading}</p>}{error && <p role="alert" className="mt-4 rounded-xl bg-amber-950 p-3 text-amber-200">{error}</p>}{result && <div className="mt-5 space-y-3" aria-live="polite"><p className="text-lg font-semibold">{result.answer}</p>{result.steps.length > 0 && <ol className="list-decimal pl-5">{result.steps.map((step) => <li key={step}>{step}</li>)}</ol>}<p className="rounded-xl bg-slate-950 p-3"><strong>{content.insight}：</strong>{result.keyInsight}</p>{result.followUpQuestion && <p>{result.followUpQuestion}</p>}</div>}</aside>;
}
