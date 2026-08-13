"use client";
import { useEffect, useState } from "react";
import type { Topic } from "@/src/data/grade9";
import type { Locale } from "@/src/config/site";
import { localize } from "@/src/lib/grade9-curriculum";
import { readLearningProgress, recordQuizAttempt, writeLearningProgress } from "@/src/lib/learning-progress";

const copy = {
  zh: { title: "我懂了吗？", submit: "提交答案", retry: "再试一次", correct: "回答正确！", wrong: "回答错误。", answer: "正确答案" },
  en: { title: "Quick check", submit: "Submit answer", retry: "Try again", correct: "Correct!", wrong: "Not quite.", answer: "Correct answer" },
  ja: { title: "理解度チェック", submit: "回答する", retry: "もう一度", correct: "正解です！", wrong: "不正解です。", answer: "正解" },
};
export function QuickCheck({ topic, locale }: { topic: Topic; locale: Locale }) {
  const [selected, setSelected] = useState<number>(); const [submitted, setSubmitted] = useState(false);
  useEffect(() => { setSelected(undefined); setSubmitted(false); }, [topic.id]);
  const options = topic.quickCheck.options ?? [];
  const correctIndex = options.findIndex((option) => option.zh === topic.quickCheck.answer.zh);
  const isCorrect = selected === correctIndex;
  const reveal = () => { if (selected === undefined || submitted) return; setSubmitted(true); writeLearningProgress(recordQuizAttempt(readLearningProgress(), topic.id, isCorrect)); };
  return <section className="rounded-2xl border border-cyan-300/30 bg-cyan-950/30 p-5"><h2 className="text-xl font-bold">{copy[locale].title}</h2><p className="mt-3">{localize(topic.quickCheck.question, locale)}</p><fieldset disabled={submitted} className="mt-3 grid gap-2">{options.map((option, index) => <label key={`${topic.id}-${index}`} className="flex cursor-pointer gap-3 rounded-xl bg-slate-900 p-3"><input type="radio" name={`check-${topic.id}`} checked={selected === index} onChange={() => setSelected(index)} />{localize(option, locale)}</label>)}</fieldset><button disabled={selected === undefined || submitted} type="button" onClick={reveal} className="mt-4 rounded-lg bg-white px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">{copy[locale].submit}</button>{submitted && <div aria-live="polite" className={`mt-4 rounded-xl p-4 ${isCorrect ? "bg-emerald-950 text-emerald-100" : "bg-rose-950 text-rose-100"}`}><strong>{isCorrect ? copy[locale].correct : copy[locale].wrong}</strong>{!isCorrect && <p className="mt-1">{copy[locale].answer}：{localize(topic.quickCheck.answer, locale)}</p>}<p className="mt-1 text-slate-200">{localize(topic.quickCheck.explanation, locale)}</p><button type="button" onClick={() => { setSelected(undefined); setSubmitted(false); }} className="mt-3 rounded-lg border border-white/30 px-3 py-2 font-bold focus-visible:outline focus-visible:outline-2">{copy[locale].retry}</button></div>}</section>;
}
