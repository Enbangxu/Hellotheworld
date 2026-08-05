"use client";

import { motion } from "framer-motion";

export type KnowledgeNode = { id: string; label: string; type: string; x: number; y: number };
export type KnowledgeEdge = { from: string; to: string };

export function KnowledgeGraph({ nodes, edges, onNodeClick }: { nodes: KnowledgeNode[]; edges: KnowledgeEdge[]; onNodeClick?: (node: KnowledgeNode) => void }) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return <div className="knowledge-graph" role="group" aria-label="交互式知识图谱"><svg viewBox="0 0 720 380" role="img" aria-label={`${nodes.length} 个节点的知识关系`}>
    <g className="graph-edges">{edges.map((edge) => { const from = byId.get(edge.from); const to = byId.get(edge.to); return from && to ? <motion.line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} /> : null; })}</g>
    {nodes.map((node, index) => <motion.g key={node.id} className="graph-node" tabIndex={0} role="button" aria-label={`${node.type}：${node.label}`} onClick={() => onNodeClick?.(node)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onNodeClick?.(node); }} initial={{ opacity: 0, scale: .5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * .08 }} viewport={{ once: true }}><circle cx={node.x} cy={node.y} r={node.id === "ai" ? 52 : 38} /><text x={node.x} y={node.y - 2}>{node.label}</text><text className="graph-type" x={node.x} y={node.y + 17}>{node.type}</text></motion.g>)}
  </svg></div>;
}
