"use client";

import { useState } from "react";
import { ExplainCard } from "@/src/components/ExplainCard";
import { KeywordTag } from "@/src/components/KeywordTag";
import type { Keyword, KeywordExplanation } from "@/src/lib/keywords";

export function AIResponse({ answer, keywords }: { answer: string; keywords: Keyword[] }) {
  const [selected, setSelected] = useState<Keyword | null>(null);
  const [explanation, setExplanation] = useState<KeywordExplanation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function explain(keyword: Keyword) {
    setSelected(keyword); setExplanation(null); setError(""); setLoading(true);
    try {
      const response = await fetch("/api/keyword/explain", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ word: keyword.word, category: keyword.category }) });
      const result = await response.json() as { data?: KeywordExplanation; error?: { message?: string } };
      if (!response.ok || !result.data) throw new Error(result.error?.message || "知识卡片暂时不可用");
      setExplanation(result.data);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "知识卡片暂时不可用"); }
    finally { setLoading(false); }
  }

  return <div className="v15-message-ai ai-response"><p className="whitespace-pre-wrap">{answer}</p>{keywords.length > 0 && <div className="keyword-list" aria-label="感兴趣的关键词">{keywords.map((keyword) => <KeywordTag key={keyword.word} keyword={keyword} onClick={explain} />)}</div>}{selected && <ExplainCard keyword={selected} data={explanation} loading={loading} error={error} onClose={() => setSelected(null)} onSelect={(word) => explain({ word, category: "related", importance: "medium" })} />}</div>;
}
