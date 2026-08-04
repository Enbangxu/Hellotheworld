"use client";

import { useState } from "react";
import { KeywordTag } from "@/src/components/KeywordTag";
import { KeywordLink } from "@/src/components/KeywordLink";
import { KnowledgeCard, type ExplainLevel, type KnowledgeCardData } from "@/src/components/KnowledgeCard";
import { trackInterest } from "@/src/lib/interestAnalyzer";
import type { Keyword } from "@/src/lib/keywords";

export function AIResponse({ answer, keywords }: { answer: string; keywords: Keyword[] }) {
  const [selected, setSelected] = useState<Keyword | null>(null);
  const [explanation, setExplanation] = useState<KnowledgeCardData>();
  const [level, setLevel] = useState<ExplainLevel>("simple");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function explain(keyword: Keyword, nextLevel: ExplainLevel = level) {
    setSelected(keyword); setLevel(nextLevel); setExplanation(undefined); setError(""); setLoading(true); trackInterest(keyword.word, keyword.category);
    try {
      const response = await fetch("/api/explain", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ keyword: keyword.word, level: nextLevel }) });
      const result = await response.json() as { data?: KnowledgeCardData; error?: { message?: string } };
      if (!response.ok || !result.data) throw new Error(result.error?.message || "知识卡片暂时不可用");
      setExplanation(result.data);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "知识卡片暂时不可用"); }
    finally { setLoading(false); }
  }

  return <div className="v15-message-ai ai-response"><KeywordLink answer={answer} keywords={keywords} onSelect={explain} />{keywords.length > 0 && <div className="keyword-list" aria-label="感兴趣的关键词">{keywords.map((keyword) => <KeywordTag key={keyword.word} keyword={keyword} onClick={explain} />)}</div>}{selected && <KnowledgeCard data={explanation} loading={loading} error={error} level={level} onLevelChange={(value) => explain(selected, value)} onClose={() => setSelected(null)} onExplore={(word) => explain({ word, category: "概念", importance: "medium" })} />}</div>;
}
