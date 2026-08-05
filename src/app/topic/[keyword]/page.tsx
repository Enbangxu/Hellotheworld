import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Network } from "lucide-react";

function decodeKeyword(value: string) {
  try { return decodeURIComponent(value).trim().slice(0, 80); }
  catch { return value.trim().slice(0, 80); }
}

export async function generateMetadata({ params }: { params: Promise<{ keyword: string }> }): Promise<Metadata> {
  const { keyword: rawKeyword } = await params;
  const keyword = decodeKeyword(rawKeyword);
  return {
    title: `${keyword} Knowledge Graph | Hello The World`,
    description: `Explore ${keyword} with AI-generated summaries, related concepts, suggested questions, and a lightweight knowledge graph entry in Hello The World.`,
    keywords: [keyword, `${keyword} knowledge graph`, "AI Knowledge Graph", "Hello The World", "AI exploration"],
  };
}

export default async function TopicPage({ params }: { params: Promise<{ keyword: string }> }) {
  const { keyword: rawKeyword } = await params;
  const keyword = decodeKeyword(rawKeyword);
  const related = ["背景", "关键人物", "核心技术", "应用场景", "未来趋势"];
  return <main className="animated-gradient min-h-screen bg-slate-950 px-6 py-12 text-white">
    <div className="mx-auto max-w-5xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cyan-200"><ArrowLeft size={16} /> Back to Hello The World</Link>
      <section className="mt-10 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-cyan-200"><Network size={15} /> V19 AI Knowledge Graph</p>
        <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">{keyword}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">这是为“{keyword}”生成的动态知识页面，面向搜索引擎和用户探索体验保留稳定入口。登录后的数据库知识档案将在未来版本接入；当前页面提供可索引的标题、简介、关键词和探索方向。</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-slate-950/35 p-6"><h2 className="text-2xl font-black text-cyan-100">简介</h2><p className="mt-3 leading-7 text-slate-300">围绕 {keyword} 建立基础理解，并把人物、地点、公司、技术、概念与历史事件连接成可继续扩展的知识节点。</p></article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/35 p-6"><h2 className="text-2xl font-black text-violet-100">推荐问题</h2><ul className="mt-3 space-y-2 text-slate-300"><li>{keyword} 的核心背景是什么？</li><li>{keyword} 与哪些技术或概念相关？</li><li>如何用 {keyword} 规划下一次 AI 探索？</li></ul></article>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">{related.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-slate-100">{keyword} · {item}</span>)}</div>
      </section>
    </div>
  </main>;
}
