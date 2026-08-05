"use client";

import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";
import { loadInterests, type InterestEntry } from "@/src/lib/interestAnalyzer";

export function UserKnowledgeMap({ refreshKey = 0, onSelect }: { refreshKey?: number; onSelect?: (keyword: string) => void }) {
  const [items, setItems] = useState<InterestEntry[]>([]);
  useEffect(() => { setItems(loadInterests().slice(0, 8)); }, [refreshKey]);
  if (!items.length) return null;
  return <section className="user-knowledge-map" aria-label="用户知识地图">
    <div className="suggested-heading"><BrainCircuit size={15} /><span>Your knowledge map</span></div>
    <div className="knowledge-map-list">{items.map((item) => <button type="button" key={item.keyword} onClick={() => onSelect?.(item.keyword)}><strong>{item.keyword}</strong><small>{item.category} · {item.clicks}</small></button>)}</div>
  </section>;
}
