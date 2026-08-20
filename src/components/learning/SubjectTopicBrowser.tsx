"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LearningLocale, Subject } from "@/src/data/grade9";
import { localize } from "@/src/lib/grade9-curriculum";

export function SubjectTopicBrowser({ subject, locale }: { subject: Subject; locale: LearningLocale }) {
  const [queryByChapter, setQueryByChapter] = useState<Record<string, string>>({});
  const total = useMemo(() => subject.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0), [subject]);
  return <div className="mt-8 space-y-4">
    <p className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">覆盖范围：{subject.edition}。共 {subject.chapters.length} 章 / {total} 个知识点；不同教材版本的差异按通用核心处理。</p>
    {subject.chapters.map((chapter, index) => {
      const query = (queryByChapter[chapter.id] ?? "").trim().toLowerCase();
      const topics = chapter.topics.filter((topic) => !query || `${localize(topic.title, locale)} ${topic.keywords.join(" ")}`.toLowerCase().includes(query));
      return <details key={chapter.id} open={index < 2} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        <summary className="cursor-pointer list-none px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="text-xl font-bold">{chapter.order}. {localize(chapter.title, locale)}</h2><p className="mt-1 text-sm text-slate-400">{localize(chapter.description, locale)}</p></div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">{chapter.topics.length} 个</span>
          </div>
        </summary>
        <div className="border-t border-white/10 px-5 pb-5 pt-4">
          <input aria-label={`${localize(chapter.title, locale)}章节内搜索`} value={queryByChapter[chapter.id] ?? ""} onChange={(event) => setQueryByChapter((current) => ({ ...current, [chapter.id]: event.target.value }))} placeholder="章节内搜索知识点" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none" />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {topics.map((topic) => <li key={topic.id}><Link className="block rounded-xl bg-slate-950 p-3 text-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 break-words" href={`/${locale}/knowledge/grade-9/${subject.slug}/${topic.slug}`}>{localize(topic.title, locale)} →</Link></li>)}
          </ul>
        </div>
      </details>;
    })}
  </div>;
}
