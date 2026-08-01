"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, LoaderCircle, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = { role: "assistant" | "user"; content: string };

export function AIChat({ open: controlledOpen, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "你好！我是你的 DeepSeek AI 探索伙伴。今天想发现、创造或学习什么？" }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const open = controlledOpen ?? internalOpen;
  const setOpen = (value: boolean) => { setInternalOpen(value); onOpenChange?.(value); };

  useEffect(() => { if (open) window.setTimeout(() => inputRef.current?.focus(), 100); }, [open]);

  async function send(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;
    setInput(""); setLoading(true); setMessages((items) => [...items, { role: "user", content: message }]);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
      const result = await response.json() as { reply?: string; error?: { message?: string } };
      if (!response.ok || !result.reply) throw new Error(result.error?.message || "AI 服务暂时不可用");
      setMessages((items) => [...items, { role: "assistant", content: result.reply! }]);
    } catch (error) {
      setMessages((items) => [...items, { role: "assistant", content: error instanceof Error ? error.message : "AI 服务暂时不可用，请稍后再试。" }]);
    } finally { setLoading(false); }
  }

  return <>
    {!open && <button type="button" className="v16-chat-launcher" onClick={() => setOpen(true)} aria-label="打开 DeepSeek AI 聊天"><MessageCircle /><span>Ask AI</span></button>}
    {open && <div className="v15-chat" role="dialog" aria-modal="true" aria-label="DeepSeek AI 聊天">
      <header><span className="flex items-center gap-2 font-black"><Bot className="text-cyan-300" /> DeepSeek AI</span><button type="button" onClick={() => setOpen(false)} aria-label="关闭聊天"><X /></button></header>
      <div className="v15-chat-messages" aria-live="polite">{messages.map((message, index) => <p key={`${message.role}-${index}`} className={message.role === "user" ? "v15-message-user" : "v15-message-ai"}>{message.content}</p>)}{loading && <p className="v15-message-ai flex items-center gap-2"><LoaderCircle className="animate-spin" size={16} /> AI 正在思考…</p>}</div>
      <form onSubmit={send}><label htmlFor="v16-chat-input" className="sr-only">输入消息</label><input ref={inputRef} id="v16-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1000} placeholder="问我任何关于探索的问题…" /><button type="submit" disabled={loading || !input.trim()} aria-label="发送"><Send size={18} /></button></form>
    </div>}
  </>;
}
