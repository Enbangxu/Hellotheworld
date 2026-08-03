"use client";

import { LoaderCircle, X } from "lucide-react";
import type { Keyword, KeywordExplanation } from "@/src/lib/keywords";

export function ExplainCard({ keyword, data, loading, error, onClose, onSelect }: { keyword: Keyword; data: KeywordExplanation | null; loading: boolean; error: string; onClose: () => void; onSelect: (word: string) => void }) {
  return <aside className="explain-card" aria-label={`${keyword.word} 知识卡片`} aria-live="polite">
    <div className="explain-card-heading"><div><small>{keyword.category}</small><h3>{keyword.word}</h3></div><button type="button" onClick={onClose} aria-label="关闭知识卡片"><X size={18} /></button></div>
    {loading && <div className="explain-loading"><LoaderCircle className="animate-spin" size={20} /> 正在生成知识卡片…</div>}
    {error && <p role="alert" className="text-rose-300">{error}</p>}
    {data && <div className="space-y-5"><section><h4>简短解释</h4><p>{data.explanation}</p></section><section><h4>应用场景</h4><ul>{data.useCases.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h4>相关关键词</h4><div className="flex flex-wrap gap-2">{data.relatedKeywords.map((item) => <button type="button" className="keyword-tag" key={item} onClick={() => onSelect(item)}>{item}</button>)}</div></section></div>}
  </aside>;
}
