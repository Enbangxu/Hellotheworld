import type { Locale } from "@/src/config/site";
import type { Topic } from "@/src/data/grade9";
import { localize } from "@/src/lib/grade9-curriculum";

const labels = {
  zh: { meaning: "一句话讲明白", example: "例如", formula: "必要公式" },
  en: { meaning: "In one sentence", example: "Example", formula: "Essential formula" },
  ja: { meaning: "ひとことで", example: "例", formula: "必要な公式" },
} as const;

export function InstantLessonCard({ topic, locale }: { topic: Topic; locale: Locale }) {
  const lesson = topic.instantLesson;
  const copy = labels[locale];
  return (
    <article className="rounded-3xl border border-white/15 bg-slate-900 px-6 py-7 shadow-lg shadow-black/20 sm:px-9 sm:py-9">
      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        {localize(topic.title, locale)}
      </h1>
      <div className="mt-7 space-y-6 text-lg leading-8 text-slate-100 sm:text-xl sm:leading-9">
        <p><strong className="mr-2 text-cyan-300">{copy.meaning}：</strong>{localize(lesson.plainMeaning, locale)}</p>
        <p><strong className="mr-2 text-cyan-300">{copy.example}：</strong>{localize(lesson.concreteExample, locale)}</p>
        {lesson.essentialFormula && lesson.formulaExplanation && (
          <div className="border-l-2 border-cyan-300 pl-4">
            <p className="font-mono text-xl font-bold text-white sm:text-2xl"><span className="mr-3 font-sans text-sm text-cyan-300">{copy.formula}</span>{lesson.essentialFormula}</p>
            <p className="mt-2 text-base leading-7 text-slate-300">{localize(lesson.formulaExplanation, locale)}</p>
          </div>
        )}
      </div>
    </article>
  );
}
