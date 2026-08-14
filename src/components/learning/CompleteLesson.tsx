import type { Topic } from "@/src/data/grade9";
import type { Locale } from "@/src/config/site";
import { localize } from "@/src/lib/grade9-curriculum";
import { LearningProgress } from "./LearningProgress";
import { QuickCheck } from "./QuickCheck";
import { SimplifyButton } from "./SimplifyButton";

export function CompleteLesson({
  topic,
  locale,
}: {
  topic: Topic;
  locale: Locale;
}) {
  const quick = topic.quickLesson;
  return (
    <article className="min-w-0 space-y-6 text-base leading-7 text-slate-200">
      <section
        className="rounded-3xl border border-cyan-300/25 bg-gradient-to-b from-cyan-950/50 to-slate-900 p-5 shadow-2xl shadow-cyan-950/20 sm:p-8"
        aria-labelledby="quick-lesson-title"
      >
        <p className="text-sm font-bold tracking-widest text-cyan-300">
          30 秒弄懂
        </p>
        <h1
          id="quick-lesson-title"
          className="mt-1 text-3xl font-black leading-tight text-white sm:text-4xl"
        >
          {localize(topic.title, locale)}
        </h1>
        <div className="mt-5 grid gap-4">
          <section aria-labelledby="quick-meaning">
            <h2 id="quick-meaning" className="text-sm font-bold text-cyan-300">
              它是什么
            </h2>
            <p className="mt-1 font-semibold text-white">
              {localize(quick.meaning, locale)}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {localize(quick.plainExplanation, locale)}
            </p>
          </section>
          <section aria-labelledby="quick-example">
            <h2 id="quick-example" className="text-sm font-bold text-cyan-300">
              看一个最简单的例子
            </h2>
            <ol className="mt-2 grid gap-2 sm:grid-cols-3">
              <li className="rounded-xl bg-slate-950/80 p-3">
                <strong className="block text-xs text-violet-300">
                  1 · 题目
                </strong>
                <span className="font-mono text-white">
                  {localize(quick.microExample.setup, locale)}
                </span>
              </li>
              <li className="rounded-xl bg-slate-950/80 p-3">
                <strong className="block text-xs text-amber-300">
                  2 · 想一想
                </strong>
                <span>{localize(quick.microExample.thinking, locale)}</span>
              </li>
              <li className="rounded-xl bg-emerald-950/60 p-3">
                <strong className="block text-xs text-emerald-300">
                  3 · 得到
                </strong>
                <span className="font-semibold text-white">
                  {localize(quick.microExample.result, locale)}
                </span>
              </li>
            </ol>
          </section>
          <div className="grid gap-3 sm:grid-cols-2">
            <section className="rounded-xl border border-white/10 p-3">
              <h2 className="text-sm font-bold text-cyan-300">什么时候用</h2>
              <p>{localize(quick.useWhen, locale)}</p>
            </section>
            <section className="rounded-xl border border-white/10 p-3">
              <h2 className="text-sm font-bold text-cyan-300">一句话记住</h2>
              <p className="font-semibold text-white">
                {localize(quick.memoryLine, locale)}
              </p>
            </section>
          </div>
        </div>
      </section>
      <QuickCheck topic={topic} locale={locale} />
      <div className="flex flex-wrap gap-3">
        <LearningProgress topicId={topic.id} />
        <SimplifyButton topicId={topic.id} />
      </div>
      <details className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <summary className="cursor-pointer font-bold text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
          展开完整讲解（约 5 分钟）
        </summary>
        <div className="mt-8 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-white">前置知识</h2>
            <ul className="mt-3 list-disc pl-6">
              {topic.prerequisites.map((item) => (
                <li key={item.zh}>{localize(item, locale)}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white">知识点导入</h2>
            <p className="mt-3">{localize(topic.introduction, locale)}</p>
          </section>
          <nav
            aria-label="完整讲解目录"
            className="rounded-2xl bg-slate-950 p-5"
          >
            <h2 className="font-bold text-white">课程目录</h2>
            <ol className="mt-2 list-decimal pl-6">
              {topic.sections.map((section) => (
                <li key={section.id}>
                  <a
                    className="text-cyan-300 hover:underline"
                    href={`#${section.id}`}
                  >
                    {localize(section.title, locale)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {topic.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2 className="text-2xl font-bold text-white">
                {localize(section.title, locale)}
              </h2>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{localize(p, locale)}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-3 list-disc pl-6">
                  {section.bullets.map((b) => (
                    <li key={b.zh}>{localize(b, locale)}</li>
                  ))}
                </ul>
              )}
              {section.formula && (
                <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4">
                  {section.formula}
                </pre>
              )}
            </section>
          ))}
          {topic.formula && (
            <section>
              <h2 className="text-2xl font-bold text-white">公式或重要结论</h2>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4">
                {topic.formula}
              </pre>
            </section>
          )}
          <section>
            <h2 className="text-2xl font-bold text-white">完整解题方法</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6">
              {topic.methodSteps.map((step) => (
                <li key={step.zh}>{localize(step, locale)}</li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white">更多例题</h2>
            {topic.workedExamples.map((example) => (
              <div
                className="mt-4 rounded-xl bg-slate-950 p-5"
                key={example.title.zh}
              >
                <h3 className="font-bold text-cyan-200">
                  {localize(example.title, locale)}
                </h3>
                <p className="mt-2">{localize(example.problem, locale)}</p>
                <ol className="mt-2 list-decimal pl-6">
                  {example.steps.map((step, i) => (
                    <li key={i}>{localize(step, locale)}</li>
                  ))}
                </ol>
                <p className="mt-2 text-emerald-300">
                  答案：{localize(example.answer, locale)}
                </p>
              </div>
            ))}
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white">常见错误</h2>
            {topic.commonMistakes.map((item, i) => (
              <div className="mt-3 rounded-xl bg-rose-950/30 p-4" key={i}>
                <strong className="text-rose-200">
                  {localize(item.mistake, locale)}
                </strong>
                <p>{localize(item.whyWrong, locale)}</p>
                <p>正确做法：{localize(item.correction, locale)}</p>
              </div>
            ))}
          </section>
        </div>
      </details>
    </article>
  );
}
