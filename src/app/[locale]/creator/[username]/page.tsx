import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { creators, getCreatorContent } from "@/src/data/network";
import { getLocale } from "@/src/lib/i18n";
import type { Locale } from "@/src/config/site";

export function generateStaticParams() { return creators.flatMap((creator) => ["en", "zh", "ja"].map((locale) => ({ locale, username: creator.username }))); }
export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> { const { username } = await params; const data = getCreatorContent(username); return { title: data ? `${data.creator.displayName} | Creator Profile` : "Creator Profile" }; }

export default async function CreatorProfilePage({ params }: { params: Promise<{ locale: string; username: string }> }) {
  const { locale: rawLocale, username } = await params;
  const locale: Locale = getLocale(rawLocale);
  const data = getCreatorContent(username);
  if (!data) notFound();
  const { creator, projects, articles, tools } = data;

  return (
    <EcosystemPageShell locale={locale} eyebrow={`@${creator.username}`} title={creator.displayName} subtitle={creator.bio}>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300 to-violet-300 text-5xl font-black text-slate-950">{creator.displayName.charAt(0)}</div>
          <h2 className="mt-5 text-xl font-black">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">{creator.skills.map((skill) => <span key={skill} className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-slate-950">{skill}</span>)}</div>
          <h2 className="mt-6 text-xl font-black">Social links</h2>
          <div className="mt-3 grid gap-2">{creator.socialLinks.map((link) => <a key={link.href} href={link.href} className="rounded-2xl bg-white/10 px-4 py-3 font-bold hover:bg-white/20">{link.label}</a>)}</div>
        </aside>
        <section className="space-y-5">
          <ContentBlock title="Projects" items={projects.map((project) => `${project.title} — ${project.description}`)} />
          <ContentBlock title="Articles" items={articles.map((article) => `${article.title} — ${article.summary}`)} />
          <ContentBlock title="Tools" items={tools.map((tool) => `${tool.name} — ${tool.description}`)} />
        </section>
      </div>
    </EcosystemPageShell>
  );
}

function ContentBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"><h2 className="text-2xl font-black">{title}</h2><div className="mt-4 grid gap-3">{items.map((item) => <p key={item} className="rounded-2xl bg-slate-950/35 p-4 text-slate-200">{item}</p>)}</div></div>;
}
