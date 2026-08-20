import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects } from "@/src/data/grade9";
import { SubjectTopicBrowser } from "@/src/components/learning/SubjectTopicBrowser";
import { Breadcrumbs } from "@/src/components/learning/Breadcrumbs";
import { getSubject, localize } from "@/src/lib/grade9-curriculum";
import { getLocale } from "@/src/lib/i18n";

export function generateStaticParams() { return subjects.map((subject) => ({ subject: subject.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; subject: string }> }): Promise<Metadata> {
  const { locale: raw, subject: slug } = await params;
  const locale = getLocale(raw);
  const subject = getSubject(slug);
  if (!subject) return {};
  const title = `${localize(subject.name, locale)}｜初三上册通用核心知识点`;
  const path = `/knowledge/grade-9/${slug}`;
  return { title, description: localize(subject.shortDescription, locale), alternates: { canonical: `/${locale}${path}`, languages: { zh: `/zh${path}`, en: `/en${path}`, ja: `/ja${path}` } } };
}
export default async function Page({ params }: { params: Promise<{ locale: string; subject: string }> }) {
  const { locale: raw, subject: slug } = await params;
  const locale = getLocale(raw);
  const subject = getSubject(slug);
  if (!subject) notFound();
  return <main className="min-h-screen bg-slate-950 px-5 py-14 text-white">
    <div className="mx-auto max-w-4xl">
      <Breadcrumbs items={[{ label: "学习中心", href: `/${locale}/knowledge` }, { label: "九年级", href: `/${locale}/knowledge/grade-9` }, { label: localize(subject.name, locale) }]} />
      <Link href={`/${locale}/knowledge/grade-9/progress`} className="float-right rounded-lg border border-cyan-300 px-3 py-2 text-sm font-bold text-cyan-200">学习进度 →</Link>
      <h1 className="text-4xl font-black">{subject.icon} {localize(subject.name, locale)}</h1>
      <p className="mt-3 text-slate-300">{localize(subject.shortDescription, locale)} · {subject.edition}</p>
      <SubjectTopicBrowser subject={subject} locale={locale} />
    </div>
  </main>;
}
