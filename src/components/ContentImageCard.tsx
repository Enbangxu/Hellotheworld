import Image from "next/image";
import type { ReactNode } from "react";

export function ContentImageCard({ image, title, description, tags, children }: { image: string; title: string; description: string; tags: string[]; children?: ReactNode }) {
  return <article className="group h-full overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-200/60 hover:shadow-2xl hover:shadow-cyan-950/30"><div className="relative aspect-[16/9] overflow-hidden bg-slate-900"><Image src={image} alt={`${title}: ${description}`} title={title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-5 sm:p-6"><h2 className="text-2xl font-black transition group-hover:text-cyan-200">{title}</h2><p className="mt-3 text-slate-200">{description}</p><div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">#{tag}</span>)}</div>{children ? <div className="mt-5">{children}</div> : null}</div></article>;
}
