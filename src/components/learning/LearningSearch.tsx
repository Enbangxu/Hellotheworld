"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { subjects, type Subject } from "@/src/data/grade9";
import { localize } from "@/src/lib/grade9-curriculum";
import type { Locale } from "@/src/config/site";

export type SearchResult = { topicId: string; href: string; title: string; subject: string; chapter: string };
export function searchLearningTopics(data: Subject[], query: string, subjectFilter: string, locale: Locale): SearchResult[] {
  const needle=query.trim().toLocaleLowerCase(),results:SearchResult[]=[];
  for(const subject of data){if(subjectFilter&&subject.id!==subjectFilter)continue;for(const chapter of subject.chapters)for(const topic of chapter.topics){
    const parent=[...Object.values(subject.name),...Object.values(chapter.title),...Object.values(topic.title),...topic.keywords].join(" ").toLocaleLowerCase();
    if(!needle||parent.includes(needle))results.push({topicId:topic.id,href:`${subject.slug}/${topic.slug}`,title:localize(topic.title,locale),subject:localize(subject.name,locale),chapter:localize(chapter.title,locale)});
    for(const micro of topic.microLessons){const text=[...Object.values(micro.title),...micro.keywords].join(" ").toLocaleLowerCase();if(needle&&text.includes(needle))results.push({topicId:micro.id,href:`${subject.slug}/${topic.slug}/${micro.slug}`,title:localize(micro.title,locale),subject:localize(subject.name,locale),chapter:localize(chapter.title,locale)});}
  }}return results;
}
const labels = { zh: { search: "搜索标题、关键词、章节或学科", all: "全部学科", results: "搜索结果", none: "没有找到匹配的知识点，请换个关键词。" }, en: { search: "Search titles, keywords, chapters or subjects", all: "All subjects", results: "Results", none: "No matching topics. Try another keyword." }, ja: { search: "タイトル、キーワード、章、教科を検索", all: "すべての教科", results: "検索結果", none: "該当する知識点がありません。" } };
export function LearningSearch({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState(""); const [filter, setFilter] = useState(""); const content = labels[locale];
  const results = useMemo(() => searchLearningTopics(subjects, query, filter, locale), [query, filter, locale]);
  return <section aria-labelledby="learning-search" className="mt-10 rounded-2xl border border-white/10 bg-slate-900 p-5"><h2 id="learning-search" className="text-2xl font-bold">{content.results}</h2><div className="mt-4 grid gap-3 sm:grid-cols-[1fr_220px]"><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={content.search} aria-label={content.search} className="rounded-xl border border-white/20 bg-slate-950 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"/><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label={content.all} className="rounded-xl border border-white/20 bg-slate-950 p-3"><option value="">{content.all}</option>{subjects.map((subject) => <option value={subject.id} key={subject.id}>{localize(subject.name, locale)}</option>)}</select></div>{(query || filter) && (results.length ? <ul className="mt-5 grid gap-2 sm:grid-cols-2">{results.map((result) => <li key={result.topicId}><Link className="block rounded-xl bg-slate-950 p-3 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href={`/${locale}/knowledge/grade-9/${result.href}`}><strong>{result.title}</strong><span className="mt-1 block text-xs text-slate-400">{result.subject} · {result.chapter}</span></Link></li>)}</ul> : <p role="status" className="mt-5 text-slate-300">{content.none}</p>)}</section>;
}
