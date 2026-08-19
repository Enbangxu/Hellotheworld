import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allTopics, getSubject, getTopicBySlug, localize } from "@/src/lib/grade9-curriculum";
import { getLocale } from "@/src/lib/i18n";
import { Breadcrumbs } from "@/src/components/learning/Breadcrumbs";
import { InstantLessonCard } from "@/src/components/learning/InstantLessonCard";
import { OptionalTutor } from "@/src/components/learning/OptionalTutor";

export function generateStaticParams() {
  return allTopics().map(({ subject, topic }) => ({ subject: subject.slug, topic: topic.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string; subject: string; topic: string }> }): Promise<Metadata> {
  const values = await params;
  const locale = getLocale(values.locale);
  const topic = getTopicBySlug(values.subject, values.topic);
  if (!topic) return {};
  return { title: `${localize(topic.title, locale)}｜一句话讲明白`, description: localize(topic.instantLesson.plainMeaning, locale) };
}
export default async function Page({ params }: { params: Promise<{ locale: string; subject: string; topic: string }> }) {
  const values = await params;
  const locale = getLocale(values.locale);
  const subject = getSubject(values.subject);
  const topic = getTopicBySlug(values.subject, values.topic);
  if (!subject || !topic) notFound();
  const topics = subject.chapters.flatMap((chapter) => chapter.topics);
  const index = topics.findIndex((item) => item.id === topic.id);
  const previous = topics[index - 1];
  const next = topics[index + 1];
  const href = (slug: string) => `/${locale}/knowledge/grade-9/${subject.slug}/${slug}`;
  return <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:py-12">
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ label: "学习中心", href: `/${locale}/knowledge` }, { label: localize(subject.name, locale), href: `/${locale}/knowledge/grade-9/${subject.slug}` }, { label: localize(topic.title, locale) }]} />
      <InstantLessonCard key={topic.id} topic={topic} locale={locale} />
      <nav aria-label="知识点切换" className="mt-5 flex justify-between gap-4 text-sm text-slate-300">
        <span>{previous && <Link className="hover:text-white" href={href(previous.slug)}>← {localize(previous.title, locale)}</Link>}</span>
        <span>{next && <Link className="hover:text-white" href={href(next.slug)}>{localize(next.title, locale)} →</Link>}</span>
      </nav>
      <OptionalTutor topicId={topic.id} locale={locale} />
    </div>
  </main>;
}
