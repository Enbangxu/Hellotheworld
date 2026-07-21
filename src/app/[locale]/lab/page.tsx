import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { siteConfig, type Locale } from "@/src/config/site";
import { labArticles } from "@/src/data/lab";
import { getLocale } from "@/src/lib/i18n";

export const metadata: Metadata = { title: "AI Lab", description: "Research notes and markdown essays for the AI Creator Ecosystem." };

export default async function LabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = getLocale(rawLocale);
  const copy = locale === "zh"
    ? { eyebrow: "AI Lab", title: "AI 创作者实验室", subtitle: "用 Markdown 文章沉淀 AI 创作方法、实验记录和全球化增长策略。" }
    : { eyebrow: "AI Lab", title: "AI Creator Lab", subtitle: "Markdown-backed essays for AI workflows, publishing systems, and global creator experiments." };

  return (
    <EcosystemPageShell locale={locale} {...copy}>
      <div className="grid gap-6 md:grid-cols-3">
        {labArticles.map((article) => (
          <article key={article.title} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <time className="text-sm font-semibold text-cyan-200">{article.date}</time>
            <h2 className="mt-3 text-2xl font-black">{article.title}</h2>
            <p className="mt-3 text-slate-200">{article.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-bold text-cyan-100">#{tag}</span>)}</div>
            <div className="mt-5 whitespace-pre-line rounded-2xl bg-slate-950/35 p-4 text-sm leading-7 text-slate-200">{article.content}</div>
          </article>
        ))}
      </div>
    </EcosystemPageShell>
  );
}

export function generateStaticParams() { return siteConfig.locales.map((locale) => ({ locale })); }
