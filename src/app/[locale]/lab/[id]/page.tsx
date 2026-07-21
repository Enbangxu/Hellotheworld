import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { siteConfig, type Locale } from "@/src/config/site";
import { projects } from "@/src/data/projects";
import { getLocale } from "@/src/lib/i18n";

export const metadata: Metadata = { title: "AI Lab Project", description: "AI Lab project detail." };
export default async function ProjectPage({ params }: { params: Promise<{ locale: string; id: string }> }) { const { locale: rawLocale, id } = await params; const locale: Locale = getLocale(rawLocale); const project = projects.find((item) => item.id === id); if (!project) notFound(); return <EcosystemPageShell locale={locale} eyebrow="AI Lab" title={project.title} subtitle={project.description}><div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"><dl className="grid gap-5 md:grid-cols-3"><div><dt className="text-cyan-200">Status</dt><dd className="text-2xl font-black">{project.status}</dd></div><div><dt className="text-cyan-200">Progress</dt><dd className="text-2xl font-black">{project.progress}%</dd></div><div><dt className="text-cyan-200">Created</dt><dd className="text-2xl font-black">{project.createdAt}</dd></div></dl><h2 className="mt-8 text-xl font-black">Stack</h2><div className="mt-3 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-bold text-cyan-100">{item}</span>)}</div><h2 className="mt-8 text-xl font-black">Links</h2><div className="mt-3 flex flex-wrap gap-2">{project.links.map((link) => <Link key={link.href} href={`/${locale}${link.href}`} className="rounded-full bg-white px-4 py-2 font-black text-slate-950">{link.label}</Link>)}</div></div></EcosystemPageShell>; }
export function generateStaticParams() { return siteConfig.locales.flatMap((locale) => projects.map((project) => ({ locale, id: project.id }))); }
