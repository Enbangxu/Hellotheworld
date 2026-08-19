"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/src/config/site";
import type { Topic } from "@/src/data/grade9";
import { localize } from "@/src/lib/grade9-curriculum";

const labels = {
  zh: { meaning: "一句话讲明白", example: "例如", formula: "必要公式", memory: "记住这句", recall: "我来回想", answer: "查看答案", prompt: "你还记得吗？", feedback: "能自己想起来，才是真的记住了。" },
  en: { meaning: "In one sentence", example: "Example", formula: "Essential formula", memory: "Remember this", recall: "Let me recall", answer: "Show answer", prompt: "Can you recall?", feedback: "Recalling it yourself is how it truly sticks." },
  ja: { meaning: "ひとことで", example: "例", formula: "必要な公式", memory: "この一言", recall: "思い出す", answer: "答えを見る", prompt: "覚えていますか？", feedback: "自分で思い出せてこそ、本当に覚えたことになります。" },
} as const;

export function InstantLessonCard({ topic, locale }: { topic: Topic; locale: Locale }) {
  const lesson = topic.instantLesson;
  const copy = labels[locale];
  const [recalling, setRecalling] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  function startRecall() {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setShowFeedback(false);
    setRecalling(true);
  }

  function showAnswer() {
    setRecalling(false);
    setShowFeedback(true);
    feedbackTimer.current = setTimeout(() => setShowFeedback(false), 3500);
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-white/15 bg-slate-900 px-6 py-7 shadow-lg shadow-black/20 sm:px-9 sm:py-9">
      <h1 className="break-words text-3xl font-black tracking-tight text-white sm:text-4xl">
        {localize(topic.title, locale)}
      </h1>
      {recalling ? (
        <div className="mt-7 space-y-5">
          <p className="text-sm font-bold text-cyan-300">{copy.prompt}</p>
          <p className="text-lg leading-8 text-slate-100 sm:text-xl sm:leading-9">{localize(lesson.recallPrompt, locale)}</p>
          <button type="button" onClick={showAnswer} className="rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
            {copy.answer}
          </button>
        </div>
      ) : (
        <>
          <div className="mt-7 space-y-5 text-lg leading-8 text-slate-100 sm:text-xl sm:leading-9">
            <p><strong className="mr-2 text-cyan-300">{copy.meaning}：</strong>{localize(lesson.plainMeaning, locale)}</p>
            <p><strong className="mr-2 text-cyan-300">{copy.example}：</strong>{localize(lesson.concreteExample, locale)}</p>
            {lesson.essentialFormula && lesson.formulaExplanation && (
              <div className="border-l-2 border-cyan-300 pl-4">
                <p className="break-words font-mono text-xl font-bold text-white sm:text-2xl"><span className="mr-3 font-sans text-sm text-cyan-300">{copy.formula}</span>{lesson.essentialFormula}</p>
                <p className="mt-2 text-base leading-7 text-slate-300">{localize(lesson.formulaExplanation, locale)}</p>
              </div>
            )}
          </div>
          <p className="mt-5 rounded-xl border border-amber-200/15 bg-amber-100/[0.06] px-4 py-3 text-base leading-7 text-amber-50">
            <strong className="mr-2 text-sm text-amber-200">{copy.memory}：</strong>{localize(lesson.memoryAnchor, locale)}
          </p>
          <button type="button" onClick={startRecall} className="mt-4 rounded-lg border border-white/20 px-3 py-1.5 text-sm font-semibold text-slate-200 hover:border-cyan-300/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
            {copy.recall}
          </button>
        </>
      )}
      <p aria-live="polite" aria-atomic="true" className="mt-3 min-h-6 text-sm text-emerald-300">
        {showFeedback ? copy.feedback : ""}
      </p>
    </article>
  );
}
