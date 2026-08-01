"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Route, Sparkles } from "lucide-react";
import { useState } from "react";
import { InteractionActions } from "@/src/components/InteractionActions";

const recommendations = [
  { tag: "灵感创造", title: "把一个微小想法，变成可体验的数字世界", description: "AI 发现你正在关注创意工具。试着从一句话出发，生成产品概念与行动路线。", image: "/images/ai-product.svg", direction: "前往 AI 创造实验室", href: "/create" },
  { tag: "世界探索", title: "下一站：用 AI 规划一场未知城市漫游", description: "结合文化、路线和隐藏地点，建立一份属于你的探索清单。", image: "/images/ai-travel.svg", direction: "探索全球灵感", href: "/en/global" },
  { tag: "持续成长", title: "构建你的个人知识星图", description: "将最近的阅读与问题连接起来，让每次探索都成为下一次推荐的线索。", image: "/images/ai-learning.svg", direction: "打开知识空间", href: "/en/knowledge" },
];

export function AIRecommendation() {
  const [active, setActive] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const item = recommendations[active];

  return (
    <section id="ai-recommendation" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-9 max-w-3xl"><p className="flex items-center gap-2 font-black uppercase tracking-[.2em] text-cyan-400"><Sparkles size={18} /> AI Recommendation</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">为你的好奇心，推荐下一站</h2><p className="mt-4 text-slate-300">根据你选择的兴趣实时切换内容、视觉灵感与探索方向。</p></div>
      <div className="v15-recommendation grid overflow-hidden lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative min-h-72"><Image src={item.image} alt={`${item.title} 推荐图片`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority={false} /></div>
        <div className="p-7 sm:p-10"><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-sm font-bold text-cyan-200">{item.tag}</span><h3 className="mt-5 text-3xl font-black leading-tight">{item.title}</h3><p className="mt-4 leading-7 text-slate-300">{item.description}</p><Link href={item.href} className="mt-7 inline-flex items-center gap-2 font-black text-cyan-300"><Route size={19} />{item.direction} →</Link><div className="mt-7"><InteractionActions onComment={() => setCommentOpen((value) => !value)} /></div>{commentOpen && <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">评论入口已准备好，未来可在这里连接用户账户与数据库。</div>}</div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">{recommendations.map((option, index) => <button key={option.tag} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`v15-interest ${active === index ? "v15-interest-active" : ""}`}><Compass size={16} />{option.tag}</button>)}</div>
    </section>
  );
}
