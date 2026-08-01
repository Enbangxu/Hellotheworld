"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { ArrowRight, Bot, LoaderCircle, Send, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ChatMessage = { role: "assistant" | "user"; content: string };

export function V15Hero() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "你好！我是你的 AI 欢迎助手。告诉我你今天想探索、创造或学习什么？" }]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function send(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;
    setInput(""); setLoading(true); setMessages((items) => [...items, { role: "user", content: message }]);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
      const result = await response.json() as { reply?: string; error?: { message?: string } };
      if (!response.ok) throw new Error(result.error?.message || "AI 服务暂时不可用");
      setMessages((items) => [...items, { role: "assistant", content: result.reply || "让我们开始探索吧！" }]);
    } catch (error) { setMessages((items) => [...items, { role: "assistant", content: error instanceof Error ? error.message : "AI 服务暂时不可用，请稍后再试。" }]); }
    finally { setLoading(false); }
  }

  function showChat() { setOpen(true); window.setTimeout(() => inputRef.current?.focus(), 100); }

  return <section id="home" className="v15-hero relative z-10 flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-10">
    <div className="ai-grid" aria-hidden="true" /><div className="v15-stars" aria-hidden="true" /><div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" />
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} className="relative mx-auto w-full max-w-5xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 backdrop-blur-xl"><Sparkles size={16} /> V15 · AI Interactive World</span>
      <h1 className="mt-7 text-5xl font-black leading-none tracking-[-.06em] text-white sm:text-7xl lg:text-8xl">Hello the <span className="v12-title-gradient">world</span></h1>
      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-2xl">欢迎来到智能探索新世界。AI 已准备好与你一起发现灵感、连接知识、创造未来。</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><Link href="#ai-recommendation" className="v15-primary">开始探索 <ArrowRight size={19} /></Link><button type="button" onClick={showChat} className="v15-secondary"><Bot size={20} /> AI聊天</button></div>
    </motion.div>
    {open && <div className="v15-chat" role="dialog" aria-modal="true" aria-label="AI 欢迎助手"><header><span className="flex items-center gap-2 font-black"><Bot className="text-cyan-300" /> AI 欢迎助手</span><button type="button" onClick={() => setOpen(false)} aria-label="关闭聊天"><X /></button></header><div className="v15-chat-messages" aria-live="polite">{messages.map((message, index) => <p key={`${message.role}-${index}`} className={message.role === "user" ? "v15-message-user" : "v15-message-ai"}>{message.content}</p>)}{loading && <p className="v15-message-ai flex items-center gap-2"><LoaderCircle className="animate-spin" size={16} /> AI 正在思考…</p>}</div><form onSubmit={send}><label htmlFor="v15-chat-input" className="sr-only">输入消息</label><input ref={inputRef} id="v15-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1000} placeholder="问我任何关于探索的问题…" /><button type="submit" disabled={loading || !input.trim()} aria-label="发送"><Send size={18} /></button></form></div>}
  </section>;
}
