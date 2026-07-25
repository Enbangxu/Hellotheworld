"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContentImageCard } from "@/src/components/ContentImageCard";
import type { Locale } from "@/src/config/site";
import type { RelatedImage } from "@/src/services/imageService";

const featured = [
  { title: "RAG Notebook", description: "Turn creator notes into grounded answers and visual knowledge maps.", tags: ["rag", "knowledge", "assistant"], href: "lab" },
  { title: "Global Publisher", description: "Publish one creative idea for multilingual audiences around the world.", tags: ["global", "seo", "localization"], href: "lab" },
  { title: "Creator AI Tools", description: "Discover practical AI workflows for research, production, and growth.", tags: ["tools", "creator", "workflow"], href: "tools" },
];

const fallback = "/images/content-placeholder.svg";

export function V8ImageShowcase({ locale }: { locale: Locale }) {
  const [images, setImages] = useState<Record<string, RelatedImage>>({});

  useEffect(() => {
    const controller = new AbortController();
    Promise.all(featured.map(async (item) => {
      const response = await fetch("/api/images/related", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item), signal: controller.signal });
      if (!response.ok) throw new Error("Image matching failed");
      return [item.title, await response.json() as RelatedImage] as const;
    })).then((results) => setImages(Object.fromEntries(results))).catch(() => undefined);
    return () => controller.abort();
  }, []);

  const copy = locale === "zh"
    ? { eyebrow: "V8 已上线", title: "AI 图片智能内容系统", description: "输入标题与描述，自动匹配 Unsplash 或 Pexels 图片；没有 API Key 时也会使用本地图片稳定呈现。", action: "探索内容", live: "智能匹配" }
    : locale === "ja"
      ? { eyebrow: "V8 リリース", title: "AI画像コンテンツシステム", description: "タイトルと説明から Unsplash / Pexels の画像を選び、APIキーがない場合もローカル画像を表示します。", action: "コンテンツを見る", live: "スマートマッチ" }
      : { eyebrow: "V8 is live", title: "AI Image Content System", description: "Titles and descriptions now match relevant Unsplash or Pexels images, with a reliable local fallback when API keys are unavailable.", action: "Explore content", live: "Smart matched" };

  return (
    <section aria-labelledby="v8-image-title" className="mx-auto max-w-6xl px-6 pb-14">
      <div className="mb-7 flex flex-col justify-between gap-5 rounded-3xl border border-cyan-300/30 bg-slate-950/55 p-6 text-white shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:flex-row sm:items-end">
        <div><p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-200">{copy.eyebrow}</p><h2 id="v8-image-title" className="mt-3 text-3xl font-black sm:text-5xl">{copy.title}</h2><p className="mt-3 max-w-3xl text-slate-200">{copy.description}</p></div>
        <span className="w-fit shrink-0 rounded-full bg-emerald-300 px-4 py-2 text-sm font-black text-emerald-950"><span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-700" />{copy.live}</span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => {
          const matched = images[item.title];
          return <Link key={item.title} href={`/${locale}/${item.href}`} className="block"><ContentImageCard image={matched?.url ?? fallback} title={item.title} description={item.description} tags={matched?.tags ?? item.tags}><div className="flex items-center justify-between text-sm font-black"><span className="text-cyan-200">{copy.action} →</span><span className="rounded-full bg-white/10 px-3 py-1 uppercase text-slate-300">{matched?.source ?? "fallback"}</span></div></ContentImageCard></Link>;
        })}
      </div>
    </section>
  );
}
