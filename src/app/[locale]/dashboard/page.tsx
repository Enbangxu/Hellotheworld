import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/src/lib/auth";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { marketplaceProducts, networkStats } from "@/src/data/network";
import { knowledgeArticles } from "@/src/data/knowledge";
import { projects } from "@/src/data/projects";
import { creatorTools } from "@/src/data/tools";
import { getLocale } from "@/src/lib/i18n";
import type { Locale } from "@/src/config/site";

export const metadata: Metadata = { title: "Dashboard", description: "Manage AI Creator Network projects, articles, tools, products, and analytics." };

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = getLocale(rawLocale);
  const session = await getSession();
  const profile = { username: "enbang", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=enbang", headline: "AI Creator Network founder" };
  const panels = [
    { title: "Projects", value: projects.length, body: "Manage project status, stacks, links, and launch progress." },
    { title: "Articles", value: knowledgeArticles.length, body: "Manage knowledge articles, summaries, tags, and publishing state." },
    { title: "Tools", value: creatorTools.length, body: "Manage creator tools, categories, URLs, and tags." },
    { title: "Products", value: marketplaceProducts.length, body: "Manage AI tools, prompts, templates, pricing, and marketplace listings." },
  ];

  return <EcosystemPageShell locale={locale} eyebrow="Dashboard" title="Creator operating center" subtitle="A secure workspace for authenticated creators to manage content and review network analytics."><div className="mb-6 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"><div className="flex flex-wrap items-center gap-4"><Image src={profile.avatar} alt="Creator avatar" width={80} height={80} className="rounded-3xl bg-cyan-200" /><div><p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-200">Creator Profile</p><h2 className="mt-2 text-2xl font-black">@{profile.username}</h2><p className="text-slate-200">{profile.headline}</p></div></div><p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">Authentication</p><p className="mt-2 text-slate-200">{session?.user ? `Signed in as ${session.user.email ?? session.user.name ?? "creator"}.` : "Sign in with GitHub OAuth to activate creator management. Google OAuth is reserved through environment variables."}</p><div className="mt-4 flex gap-3"><Link href="/api/auth/signin" className="rounded-full bg-cyan-300 px-5 py-3 font-black text-slate-950">Login / Register</Link><Link href="/api/auth/signout" className="rounded-full bg-white/10 px-5 py-3 font-black text-white">Logout</Link></div></div><div className="grid gap-5 md:grid-cols-4">{Object.entries(networkStats).map(([label, value]) => <div key={label} className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"><p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-200">{label}</p><p className="mt-3 text-3xl font-black">{value}</p></div>)}</div><div className="mt-6 grid gap-5 md:grid-cols-2">{panels.map((panel) => <div key={panel.title} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"><p className="text-4xl font-black text-cyan-200">{panel.value}</p><h2 className="mt-3 text-2xl font-black">Manage {panel.title}</h2><p className="mt-3 text-slate-200">{panel.body}</p></div>)}</div></EcosystemPageShell>;
}
