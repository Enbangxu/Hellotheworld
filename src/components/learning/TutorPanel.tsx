"use client";
import { useState, type KeyboardEvent } from "react";
import type { Locale } from "@/src/config/site";
import type { TutorMode, TutorResponse } from "@/src/lib/learning-schema";

type Message = { role: "user"; text: string } | { role: "model"; response: TutorResponse };
const copy = {
  zh: { title: "问 AI", placeholder: "哪一点还没看懂？", send: "发送", loading: "正在回答…", actions: ["说得更简单", "举个具体例子"], errors: "AI 导师暂时不可用，请稍后再试。" },
  en: { title: "Ask AI", placeholder: "What is still unclear?", send: "Send", loading: "Replying…", actions: ["Make it simpler", "Give a concrete example"], errors: "The AI tutor is temporarily unavailable." },
  ja: { title: "AIに聞く", placeholder: "どこが分かりませんか？", send: "送信", loading: "回答中…", actions: ["もっと簡単に", "具体例を出して"], errors: "AIチューターは一時的に利用できません。" },
} as const;
export function TutorPanel({ topicId, locale }: { topicId: string; locale: Locale }) {
  const content = copy[locale];
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function run(mode: TutorMode, shortcut?: string) {
    const text = (shortcut ?? question).trim();
    if (loading || (!text && mode === "ask")) return;
    setLoading(true); setError("");
    try {
      const history = messages.slice(-8).map((message) => ({ role: message.role, text: message.role === "user" ? message.text : [message.response.answer, message.response.example].filter(Boolean).join("\n") }));
      const response = await fetch("/api/learning/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ locale, topicId, mode, question: text, history }) });
      const data = (await response.json()) as TutorResponse;
      if (!response.ok) throw new Error(content.errors);
      setMessages((current) => [...current, { role: "user", text }, { role: "model", response: data }]); setQuestion("");
    } catch { setError(content.errors); } finally { setLoading(false); }
  }
  function keyDown(event: KeyboardEvent<HTMLTextAreaElement>) { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void run("ask"); } }
  return <aside className="rounded-2xl border border-white/15 bg-slate-900 p-5" aria-labelledby="tutor-title">
    <h2 id="tutor-title" className="text-xl font-bold">{content.title}</h2>
    {messages.length > 0 && <ol aria-live="polite" className="mt-4 space-y-3">{messages.map((message, index) => <li key={index} className={`rounded-xl p-3 ${message.role === "user" ? "ml-6 bg-slate-800" : "mr-6 bg-slate-950"}`}>{message.role === "user" ? <p>{message.text}</p> : <div><p>{message.response.answer}</p>{message.response.example && <p className="mt-2 text-slate-300">{message.response.example}</p>}</div>}</li>)}</ol>}
    <textarea value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={keyDown} disabled={loading} maxLength={1000} aria-label={content.placeholder} placeholder={content.placeholder} className="mt-4 min-h-20 w-full rounded-xl border border-white/20 bg-slate-950 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" />
    <div className="mt-2 flex flex-wrap gap-2"><button type="button" disabled={loading || !question.trim()} onClick={() => void run("ask")} className="rounded-lg bg-cyan-300 px-4 py-2 font-bold text-slate-950 disabled:opacity-40">{content.send}</button>{(["simplify", "example"] as const).map((mode, index) => <button type="button" disabled={loading} key={mode} onClick={() => void run(mode, content.actions[index])} className="rounded-lg border border-white/20 px-3 py-2 text-sm disabled:opacity-40">{content.actions[index]}</button>)}</div>
    {loading && <p role="status" className="mt-3 text-slate-400">{content.loading}</p>}{error && <p role="alert" className="mt-3 text-amber-300">{error}</p>}
  </aside>;
}
