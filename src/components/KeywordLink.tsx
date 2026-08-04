"use client";

import type { ReactNode } from "react";
import type { Keyword } from "@/src/lib/keywords";

export function KeywordLink({ answer, keywords, onSelect }: { answer: string; keywords: Keyword[]; onSelect: (keyword: Keyword) => void }) {
  const matches = keywords.filter((item) => item.word && answer.toLocaleLowerCase().includes(item.word.toLocaleLowerCase())).sort((a, b) => b.word.length - a.word.length);
  if (!matches.length) return <p className="whitespace-pre-wrap">{answer}</p>;
  const pattern = new RegExp(`(${matches.map((item) => item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "giu");
  const lookup = new Map(matches.map((item) => [item.word.toLocaleLowerCase(), item]));
  const content: ReactNode[] = answer.split(pattern).map((part, index) => {
    const keyword = lookup.get(part.toLocaleLowerCase());
    return keyword ? <button type="button" className="keyword-inline" key={`${part}-${index}`} title={`打开${keyword.category}知识卡片`} onClick={() => onSelect(keyword)}>{part}</button> : part;
  });
  return <p className="whitespace-pre-wrap">{content}</p>;
}
