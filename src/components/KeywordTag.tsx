"use client";

import type { Keyword } from "@/src/lib/keywords";

export function KeywordTag({ keyword, onClick }: { keyword: Keyword; onClick: (keyword: Keyword) => void }) {
  return <button type="button" className="keyword-tag" onClick={() => onClick(keyword)} title={`${keyword.category} · ${keyword.importance}`}>
    {keyword.word}
  </button>;
}
