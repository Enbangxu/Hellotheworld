import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { FeedCard, type CommunityPost } from "@/src/components/FeedCard";
import { type Locale } from "@/src/config/site";
import { getLocale } from "@/src/lib/i18n";

export const metadata: Metadata = { title: "Community Feed", description: "Discover AI artwork and share prompts and agents with the AI Life Ecosystem community." };
const posts: CommunityPost[] = [
  { type: "AI Artwork", author: "mira", title: "Cities that remember our dreams", body: "A cinematic study created with a hand-tuned visual storytelling workflow.", tags: ["AIArt", "FutureCity"], likes: 842, comments: 61 },
  { type: "Prompt", author: "linachen", title: "A source-first research prompt", body: "A reusable prompt pattern that separates evidence, inference, and open questions before drafting.", tags: ["Prompt", "RAG"], likes: 516, comments: 34 },
  { type: "Agent", author: "sora", title: "Meet Launch Storyteller", body: "I shared my agent for turning product notes into a multilingual launch narrative. Remix it for your next build.", tags: ["Agent", "Creator"], likes: 693, comments: 48 },
];
export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: rawLocale } = await params; const locale: Locale = getLocale(rawLocale); return <EcosystemPageShell locale={locale} eyebrow="Community Feed" title={locale === "zh" ? "分享你的 AI 世界" : locale === "ja" ? "AIの世界を共有しよう" : "Share what you create with AI."} subtitle="Discover original AI work, exchange useful prompts, and remix agents from creators around the world."><div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"><section className="space-y-4">{posts.map((post, index) => <FeedCard key={post.title} post={post} index={index} />)}</section><aside className="h-fit rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"><TrendingUp className="text-cyan-200" /><h2 className="mt-3 text-2xl font-black">Trending now</h2><p className="mt-3 text-slate-200">AI visual journals, evidence-first prompts, personal agents, and multilingual creator workflows.</p></aside></div></EcosystemPageShell>; }
