"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { matchImage } from "@/src/lib/contentImageMatcher";

type SmartImageProps = { content: string; className?: string; priority?: boolean };

export function SmartImage({ content, className = "", priority = false }: SmartImageProps) {
  const matched = useMemo(() => matchImage(content), [content]);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = failed ? "/images/content-placeholder.svg" : matched.imageUrl;

  return <div className={`relative overflow-hidden bg-slate-900 ${className}`} aria-busy={!loaded}>
    {!loaded && <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-slate-800 via-violet-900 to-slate-800" aria-label="Loading image" />}
    <Image src={src} alt={failed ? "AI content image placeholder" : matched.alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className={`object-cover transition duration-500 ${loaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setLoaded(true)} onError={() => { setFailed(true); setLoaded(false); }} />
  </div>;
}
