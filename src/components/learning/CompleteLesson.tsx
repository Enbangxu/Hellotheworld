import type { Topic } from "@/src/data/grade9";
import type { Locale } from "@/src/config/site";
import { localize } from "@/src/lib/grade9-curriculum";

export function CompleteLesson({ topic, locale }: { topic: Topic; locale: Locale }) {
  return (
    <article className="min-w-0 space-y-10 text-base leading-7 text-slate-200">
      <section>
        <h2 className="text-2xl font-bold text-white">前置知识</h2>
        <ul className="mt-3 list-disc pl-6">
          {topic.prerequisites.map((item) => <li key={item.zh}>{localize(item, locale)}</li>)}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white">知识点导入</h2>
        <p className="mt-3">{localize(topic.introduction, locale)}</p>
      </section>
      <nav aria-label="完整讲解目录" className="rounded-2xl bg-slate-950 p-5">
        <h2 className="font-bold text-white">课程目录</h2>
        <ol className="mt-2 list-decimal pl-6">
          {topic.sections.map((section) => <li key={section.id}><a className="text-cyan-300 hover:underline" href={`#${section.id}`}>{localize(section.title, locale)}</a></li>)}
        </ol>
      </nav>
      {topic.sections.map((section) => (
        <section id={section.id} key={section.id}>
          <h2 className="text-2xl font-bold text-white">{localize(section.title, locale)}</h2>
          <div className="mt-3 space-y-4">{section.paragraphs.map((paragraph, index) => <p key={index}>{localize(paragraph, locale)}</p>)}</div>
          {section.bullets && <ul className="mt-3 list-disc pl-6">{section.bullets.map((item) => <li key={item.zh}>{localize(item, locale)}</li>)}</ul>}
          {section.formula && <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4">{section.formula}</pre>}
        </section>
      ))}
      {topic.formula && <section><h2 className="text-2xl font-bold text-white">公式或重要结论</h2><pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4">{topic.formula}</pre></section>}
      <section>
        <h2 className="text-2xl font-bold text-white">完整解题方法</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">{topic.methodSteps.map((step) => <li key={step.zh}>{localize(step, locale)}</li>)}</ol>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white">更多例题</h2>
        {topic.workedExamples.map((example) => <div className="mt-4 rounded-xl bg-slate-950 p-5" key={example.title.zh}><h3 className="font-bold text-cyan-200">{localize(example.title, locale)}</h3><p className="mt-2">{localize(example.problem, locale)}</p><ol className="mt-2 list-decimal pl-6">{example.steps.map((step, index) => <li key={index}>{localize(step, locale)}</li>)}</ol><p className="mt-2 text-emerald-300">答案：{localize(example.answer, locale)}</p></div>)}
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white">常见错误</h2>
        {topic.commonMistakes.map((item, index) => <div className="mt-3 rounded-xl bg-rose-950/30 p-4" key={index}><strong className="text-rose-200">{localize(item.mistake, locale)}</strong><p>{localize(item.whyWrong, locale)}</p><p>正确做法：{localize(item.correction, locale)}</p></div>)}
      </section>
    </article>
  );
}
