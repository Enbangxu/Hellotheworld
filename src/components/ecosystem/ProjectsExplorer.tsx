"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/src/config/site";
import { projects, projectTags } from "@/src/data/projects";
import { ContentImageCard } from "@/src/components/ContentImageCard";

export function ProjectsExplorer({ locale, allLabel }: { locale: Locale; allLabel: string }) {
  const [tag, setTag] = useState(allLabel);
  const filtered = useMemo(() => projects.filter((project) => tag === allLabel || project.tags.includes(tag)), [allLabel, tag]);
  return <div className="space-y-6"><div className="flex flex-wrap gap-2 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">{[allLabel, ...projectTags].map((item) => <button type="button" key={item} onClick={() => setTag(item)} className={`rounded-full px-4 py-2 text-sm font-black ${tag === item ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-white"}`}>#{item}</button>)}</div><div className="grid gap-5 md:grid-cols-2">{filtered.map((project) => <Link key={project.id} href={`/${locale}/lab/${project.id}`}><ContentImageCard image={project.image} title={project.title} description={project.description} tags={project.tags}><div className="flex items-center justify-between"><p className="text-sm font-black text-cyan-200">{project.status}</p><p className="font-black">{project.progress}%</p></div><div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-cyan-300" style={{ width: `${project.progress}%` }} /></div></ContentImageCard></Link>)}</div></div>;
}
