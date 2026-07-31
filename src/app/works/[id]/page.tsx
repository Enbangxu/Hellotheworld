import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreatorCard } from "@/src/components/creative-lab/CreatorCard";
import { CreationResult } from "@/src/components/creative-lab/CreationResult";
import { siteConfig } from "@/src/config/site";
import { normalizeCreativeWork } from "@/src/lib/creative-schema";
import { prisma } from "@/src/lib/prisma";

type PageProps = { params: Promise<{ id: string }> };

// Shared works require a live database record. Keeping this route dynamic
// prevents CI and Vercel builds from trying to prerender database content.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const creation = await prisma.creation.findFirst({ where: { OR: [{ id }, { slug: id }], isPublic: true } }).catch(() => null);
  if (!creation) return { robots: { index: false } };
  const url = `${siteConfig.url}/works/${creation.slug}`;
  return {
    title: creation.title,
    description: creation.tagline,
    alternates: { canonical: url },
    openGraph: { type: "article", title: creation.title, description: creation.tagline, url, images: [{ url: "/images/og-v14.svg", width: 1200, height: 630, alt: "Hello the world AI creation" }] },
    twitter: { card: "summary_large_image", title: creation.title, description: creation.tagline, images: ["/images/og-v14.svg"] },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { id } = await params;
  const creation = await prisma.creation.findFirst({ where: { OR: [{ id }, { slug: id }], isPublic: true } }).catch(() => null);
  if (!creation) notFound();
  const work = normalizeCreativeWork(creation.result);
  return <main className="creative-lab min-h-screen bg-slate-950 px-5 py-10 text-white"><div className="mx-auto max-w-5xl space-y-6">
    <Link className="creative-button" href="/create">← AI Creative Lab</Link>
    <CreatorCard title={creation.title} description={creation.tagline} category={creation.category} createdAt={creation.createdAt} originalIdea={creation.input} shareUrl={`/works/${creation.slug}`} />
    <CreationResult work={work} onRefine={() => {}} />
  </div></main>;
}
