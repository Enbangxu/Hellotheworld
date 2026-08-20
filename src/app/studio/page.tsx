import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, History, ImageIcon, Lightbulb, Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "AI 工作室", description: "选择 Gemini 图片或 DeepSeek 创意工作室，把想法变成作品。" };

export default function StudioPage() {
  return <main className="image-studio min-h-screen text-white"><div className="image-studio-glow" aria-hidden="true" />
    <header className="relative mx-auto max-w-6xl px-5 py-6"><Link href="/" className="font-black tracking-tight">Hello the World</Link></header>
    <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-10">
      <span className="image-kicker"><Sparkles size={14}/>V24 · UNIFIED AI STUDIO</span>
      <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">AI 工作室</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-300">选择一种创作方式，把想法真正变成作品。</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="image-panel flex flex-col p-6 sm:p-8"><div className="flex items-center gap-4"><span className="rounded-2xl bg-cyan-300/15 p-4 text-cyan-200"><ImageIcon size={30}/></span><span className="image-kicker">Gemini</span></div><h2 className="mt-7 text-3xl font-black">Gemini 图片工作室</h2><p className="mt-3 text-lg text-slate-300">把文字描述变成图片</p><p className="mt-4 flex-1 leading-7 text-slate-400">写实、动漫、3D、水彩等多种风格，支持方形、横向与竖向画面。</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/create" className="image-primary"><Sparkles size={18}/>开始生成图片</Link><Link href="/history" className="image-secondary"><History size={18}/>查看我的作品</Link></div></article>
        <article className="image-panel flex flex-col p-6 sm:p-8"><div className="flex items-center gap-4"><span className="rounded-2xl bg-violet-300/15 p-4 text-violet-200"><Lightbulb size={30}/></span><span className="image-kicker">DeepSeek</span></div><h2 className="mt-7 text-3xl font-black">DeepSeek 创意工作室</h2><p className="mt-3 text-lg text-slate-300">把模糊想法变成清晰方案</p><p className="mt-4 flex-1 leading-7 text-slate-400">从一句话出发，完善网站、App、创业、学习或内容方案，并保存和导出版本。</p><div className="mt-8"><Link href="/studio/ideas" className="image-primary">开始完善想法<ArrowRight size={18}/></Link></div></article>
      </div>
    </section>
  </main>;
}
