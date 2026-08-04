"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LoaderCircle, X } from "lucide-react";

export type KnowledgeCardData = { title: string; summary: string; relatedKeywords: string[] };
export type ExplainLevel = "simple" | "expert" | "business";

export function KnowledgeCard({ data, loading, error, level, onLevelChange, onClose, onExplore }: { data?: KnowledgeCardData; loading?: boolean; error?: string; level: ExplainLevel; onLevelChange: (level: ExplainLevel) => void; onClose: () => void; onExplore: (keyword: string) => void }) {
  return <AnimatePresence><motion.aside className="knowledge-card" role="dialog" aria-modal="true" aria-label={`${data?.title || "关键词"}知识卡片`} initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
    <header><div><small>AI KNOWLEDGE CARD</small><h3>{data?.title || "正在建立知识连接"}</h3></div><button onClick={onClose} aria-label="关闭知识卡片"><X /></button></header>
    <div className="knowledge-levels" aria-label="解释深度">{(["simple", "expert", "business"] as ExplainLevel[]).map((item) => <button key={item} className={level === item ? "active" : ""} onClick={() => onLevelChange(item)}>{item === "simple" ? "通俗" : item === "expert" ? "专家" : "商业"}</button>)}</div>
    {loading ? <p className="flex items-center gap-2 text-cyan-300"><LoaderCircle className="animate-spin" /> DeepSeek 正在连接知识…</p> : error ? <p className="text-rose-300">{error}</p> : data && <><p className="knowledge-summary">{data.summary}</p><div className="knowledge-related"><h4>相关关键词</h4><div>{data.relatedKeywords.map((word) => <button key={word} onClick={() => onExplore(word)}>{word}</button>)}</div></div><button className="knowledge-explore" onClick={() => onExplore(data.relatedKeywords[0] || data.title)}>继续探索 <ArrowRight size={17} /></button></>}
  </motion.aside></AnimatePresence>;
}
