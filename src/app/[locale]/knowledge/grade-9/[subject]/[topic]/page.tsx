import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allTopics,
  getSubject,
  getTopicBySlug,
  localize,
} from "@/src/lib/grade9-curriculum";
import { getLocale } from "@/src/lib/i18n";
import { getTwentySecondLesson } from "@/src/lib/twenty-second-lesson";
import { Breadcrumbs } from "@/src/components/learning/Breadcrumbs";
import { CompleteLesson } from "@/src/components/learning/CompleteLesson";
import { QuickCheck } from "@/src/components/learning/QuickCheck";
import { TopicLearningRoute } from "@/src/components/learning/TopicLearningRoute";
import { TutorPanel } from "@/src/components/learning/TutorPanel";

export function generateStaticParams() {
  return allTopics().map(({ subject, topic }) => ({
    subject: subject.slug,
    topic: topic.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; subject: string; topic: string }>;
}): Promise<Metadata> {
  const values = await params;
  const locale = getLocale(values.locale);
  const topic = getTopicBySlug(values.subject, values.topic);
  if (!topic) return {};
  const lesson = getTwentySecondLesson(topic, locale);
  return {
    title: `${localize(topic.title, locale)}｜20 秒核心`,
    description: lesson.core,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; subject: string; topic: string }>;
}) {
  const values = await params;
  const locale = getLocale(values.locale);
  const subject = getSubject(values.subject);
  const topic = getTopicBySlug(values.subject, values.topic);
  if (!subject || !topic) notFound();

  const subjectTopics = subject.chapters.flatMap((chapter) => chapter.topics);
  const topicIndex = subjectTopics.findIndex((item) => item.id === topic.id);
  const previous = subjectTopics[topicIndex - 1];
  const next = subjectTopics[topicIndex + 1];
  const catalog = allTopics();
  const related = topic.relatedTopicIds
    .map((id) => catalog.find((entry) => entry.topic.id === id))
    .filter((entry): entry is (typeof catalog)[number] => Boolean(entry));
  const sameChapter = related.find((entry) => entry.chapter.id === topic.chapterId);
  const crossChapter = related.find((entry) => entry.chapter.id !== topic.chapterId);
  const candidates = [
    sameChapter && { ...sameChapter, label: "同章关联" },
    crossChapter && { ...crossChapter, label: "跨章关联" },
    previous && {
      subject,
      topic: previous,
      label: "先懂它 · 前置",
    },
    next && { subject, topic: next, label: "接着学 · 后续" },
  ].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const links = candidates
    .filter((entry, index) => candidates.findIndex((item) => item.topic.id === entry.topic.id) === index)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[
          { label: "学习中心", href: `/${locale}/knowledge` },
          { label: localize(subject.name, locale), href: `/${locale}/knowledge/grade-9/${subject.slug}` },
          { label: localize(topic.title, locale) },
        ]} />

        <TopicLearningRoute topic={topic} locale={locale} />

        <section className="mt-8" aria-labelledby="knowledge-chain-title">
          <p className="text-sm font-bold tracking-widest text-cyan-300">知识链</p>
          <h2 id="knowledge-chain-title" className="mt-1 text-2xl font-black">它不是孤立的一页</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {links.map((entry) => (
              <Link
                key={entry.topic.id}
                className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-cyan-300/60 hover:bg-slate-800"
                href={`/${locale}/knowledge/grade-9/${entry.subject.slug}/${entry.topic.slug}`}
              >
                <small className="font-bold text-cyan-300">{entry.label}</small>
                <strong className="mt-2 block">{localize(entry.topic.title, locale)}</strong>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 space-y-4">
          <details className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
            <summary className="cursor-pointer font-bold text-cyan-200">可选：用1道题确认是否理解</summary>
            <div className="mt-6"><QuickCheck topic={topic} locale={locale} /></div>
          </details>
          <details className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
            <summary className="cursor-pointer font-bold text-cyan-200">可选：问AI导师</summary>
            <div className="mt-6"><TutorPanel topicId={topic.id} locale={locale} /></div>
          </details>
          <details className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
            <summary className="cursor-pointer font-bold text-cyan-200">可选：展开完整讲解</summary>
            <div className="mt-6"><CompleteLesson topic={topic} locale={locale} /></div>
          </details>
        </div>
      </div>
    </main>
  );
}
