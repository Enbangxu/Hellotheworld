"use client";

import Link from "next/link";
import { Copy, RefreshCw, Share2 } from "lucide-react";

type CreatorCardProps = {
  title: string;
  description: string;
  category: string;
  createdAt: string | Date;
  originalIdea: string;
  shareUrl?: string;
  onShare?: () => void | Promise<void>;
};

export function CreatorCard({ title, description, category, createdAt, originalIdea, shareUrl, onShare }: CreatorCardProps) {
  const created = new Date(createdAt);
  const remixHref = `/create?idea=${encodeURIComponent(originalIdea)}`;
  const copyLink = async () => {
    const url = shareUrl || window.location.href;
    await navigator.clipboard.writeText(new URL(url, window.location.origin).toString());
  };

  return (
    <article className="creative-glass overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-violet-200">{category}</span>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">{title}</h2>
          <p className="mt-2 leading-7 text-slate-300">{description}</p>
          <time className="mt-4 block text-sm text-slate-400" dateTime={created.toISOString()}>Created {created.toLocaleString()}</time>
        </div>
        <div className="flex flex-wrap gap-2">
          {onShare && <button type="button" onClick={onShare} className="creative-button"><Share2 /> Share</button>}
          {shareUrl && <button type="button" onClick={copyLink} className="creative-button"><Copy /> Copy link</button>}
          <Link href={remixHref} className="creative-primary"><RefreshCw /> Remix</Link>
        </div>
      </div>
    </article>
  );
}
