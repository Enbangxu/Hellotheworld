"use client";

import { Compass } from "lucide-react";

export function SuggestedQuestions({ questions, onAsk }: { questions: string[]; onAsk?: (question: string) => void }) {
  if (!questions.length) return null;
  return <section className="suggested-questions" aria-label="AI 推荐探索问题">
    <div className="suggested-heading"><Compass size={15} /><span>Suggested exploration</span></div>
    <div className="suggested-list">{questions.map((question) => <button type="button" key={question} onClick={() => onAsk?.(question)}>{question}</button>)}</div>
  </section>;
}
