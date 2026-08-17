"use client";

import type { Locale } from "@/src/config/site";
import type { Topic } from "@/src/data/grade9";
import { localize } from "@/src/lib/grade9-curriculum";
import { getTwentySecondLesson } from "@/src/lib/twenty-second-lesson";
import { LearningProgress } from "./LearningProgress";

export function TopicLearningRoute({
  topic,
  locale,
}: {
  topic: Topic;
  locale: Locale;
}) {
  const lesson = getTwentySecondLesson(topic, locale);

  return (
    <header className="rounded-3xl border border-cyan-300/25 bg-gradient-to-br from-cyan-950 to-slate-900 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold tracking-widest text-cyan-300">20 秒核心</p>
        <p className="text-sm text-slate-300">只看一句话和一个关系</p>
      </div>
      <h1 className="mt-3 text-3xl font-black sm:text-4xl">
        {localize(topic.title, locale)}
      </h1>

      <section className="mt-6" aria-labelledby="core-sentence">
        <h2 id="core-sentence" className="text-sm font-bold text-cyan-300">
          先记这一句
        </h2>
        <p className="mt-2 text-xl font-semibold leading-relaxed">{lesson.core}</p>
      </section>

      <section className="mt-6" aria-labelledby="instant-example">
        <h2 id="instant-example" className="text-sm font-bold text-cyan-300">
          一眼看懂
        </h2>
        <div className="mt-2 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-xl bg-slate-950/70 p-4">
            <strong className="block text-xs text-violet-300">看到</strong>
            <span>{lesson.setup}</span>
          </div>
          <span className="self-center text-center text-2xl text-cyan-300" aria-hidden="true">→</span>
          <div className="rounded-xl bg-emerald-950/50 p-4">
            <strong className="block text-xs text-emerald-300">就想到</strong>
            <span>{lesson.result}</span>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <LearningProgress topicId={topic.id} />
      </div>
    </header>
  );
}
