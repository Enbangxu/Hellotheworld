"use client";

import { useState } from "react";
import { Compass, Flame, Sparkles } from "lucide-react";
import { KnowledgeGraph, type KnowledgeNode } from "@/src/components/KnowledgeGraph";
import { KnowledgeCard, type ExplainLevel, type KnowledgeCardData } from "@/src/components/KnowledgeCard";
import { trackInterest } from "@/src/lib/interestAnalyzer";

const nodes: KnowledgeNode[] = [
  { id: "ai", label: "生成式 AI", type: "技术", x: 360, y: 190 }, { id: "deepseek", label: "DeepSeek", type: "公司", x: 150, y: 95 },
  { id: "agent", label: "AI Agent", type: "概念", x: 575, y: 92 }, { id: "robot", label: "具身智能", type: "技术", x: 590, y: 292 },
  { id: "future", label: "未来工作", type: "概念", x: 145, y: 292 },
];
const edges = [{ from: "ai", to: "deepseek" }, { from: "ai", to: "agent" }, { from: "ai", to: "robot" }, { from: "ai", to: "future" }];
const topics = [{ title: "AI Agent 如何重塑工作流", tag: "趋势 · 8.9k 探索" }, { title: "具身智能的下一个突破", tag: "科技 · 6.2k 探索" }, { title: "DeepSeek 推理模型地图", tag: "AI · 5.7k 探索" }];

export function DailyDiscovery() {
  const [selected, setSelected] = useState<KnowledgeNode | null>(null);
  const [level, setLevel] = useState<ExplainLevel>("simple");
  const [data, setData] = useState<KnowledgeCardData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function explore(node: KnowledgeNode, nextLevel = level) {
    setSelected(node); setLevel(nextLevel); setLoading(true); setError(""); setData(undefined); trackInterest(node.label, node.type);
    try { const response = await fetch("/api/explain", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ keyword: node.label, level: nextLevel }) }); const result = await response.json() as { data?: KnowledgeCardData; error?: { message?: string } }; if (!response.ok || !result.data) throw new Error(result.error?.message || "知识连接失败"); setData(result.data); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "知识连接失败"); }
    finally { setLoading(false); }
  }
  return <section className="v18-discovery relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10"><div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p><Sparkles size={16} /> DAILY DISCOVERY · 每日发现</p><h2>今天，沿着好奇心探索未来。</h2></div><span className="discovery-live"><Flame size={16} /> 实时探索热度</span></div><div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="grid gap-4">{topics.map((topic, index) => <button key={topic.title} onClick={() => explore(nodes[index + 2] || nodes[0])} className="discovery-topic"><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{topic.title}</strong><small>{topic.tag}</small></div><Compass /></button>)}</div><div className="discovery-graph"><div><span>LIVE KNOWLEDGE MAP</span><strong>点击节点，打开 AI 知识卡片</strong></div><KnowledgeGraph nodes={nodes} edges={edges} onNodeClick={explore} /></div></div>{selected && <KnowledgeCard data={data} loading={loading} error={error} level={level} onClose={() => setSelected(null)} onLevelChange={(value) => explore(selected, value)} onExplore={(word) => explore({ ...selected, id: word, label: word })} />}</section>;
}
