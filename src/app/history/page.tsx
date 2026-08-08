import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImageIcon, Sparkles } from "lucide-react";
import { prisma } from "@/src/lib/prisma";

export const metadata: Metadata = { title: "生成历史 · Hello the World", description: "查看曾经生成的 AI 图片。" };
export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  let items: Array<{ id: string; prompt: string; style: string; size: string; imageUrl: string; createdAt: Date }> = [];
  let unavailable = false;
  try { items = await prisma.generationTask.findMany({ orderBy: { createdAt: "desc" }, take: 60 }); }
  catch (error) { unavailable = true; console.error("Unable to load generation history", error); }
  return <main className="image-studio min-h-screen text-white"><div className="image-studio-glow" aria-hidden="true" /><header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6"><Link href="/create" className="image-secondary"><ArrowLeft size={17}/>返回创作</Link><span className="font-black">Hello the World</span></header><section className="relative mx-auto max-w-6xl px-5 pb-16 pt-8"><span className="image-kicker"><Sparkles size={14}/>YOUR GALLERY</span><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">生成历史</h1><p className="mt-3 text-slate-400">每一次灵感，都值得被珍藏。</p>{unavailable ? <div className="image-panel mt-10 p-8 text-center text-slate-300">暂时无法读取历史记录，请确认数据库已连接并完成迁移。</div> : items.length === 0 ? <div className="image-panel mt-10 flex min-h-72 flex-col items-center justify-center text-slate-500"><ImageIcon size={44}/><p className="mt-4 font-bold text-slate-300">还没有生成记录</p><Link href="/create" className="image-primary mt-5">开始创作</Link></div> : <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id} className="image-history-card"><div className="relative aspect-square overflow-hidden bg-slate-900"><Image src={item.imageUrl} alt={item.prompt} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 hover:scale-105" /></div><div className="p-5"><p className="line-clamp-2 min-h-12 font-bold leading-6">{item.prompt}</p><div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span className="rounded-full bg-white/5 px-2.5 py-1">{item.style} · {item.size}</span><time dateTime={item.createdAt.toISOString()}>{new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(item.createdAt)}</time></div></div></article>)}</div>}</section></main>;
}
