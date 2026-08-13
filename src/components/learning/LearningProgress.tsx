"use client";
import { useEffect, useState } from "react";
import { markTopicLearned, PROGRESS_EVENT, readLearningProgress, recordTopicVisit, writeLearningProgress } from "@/src/lib/learning-progress";

export function LearningProgress({ topicId }: { topicId: string }) {
  const [learned, setLearned] = useState(false);
  useEffect(() => {
    const refresh = () => setLearned(Boolean(readLearningProgress().topics[topicId]?.learnedAt));
    const progress = recordTopicVisit(readLearningProgress(), topicId);
    writeLearningProgress(progress); refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    return () => window.removeEventListener(PROGRESS_EVENT, refresh);
  }, [topicId]);
  const toggle = () => writeLearningProgress(markTopicLearned(readLearningProgress(), topicId, !learned));
  return <button type="button" onClick={toggle} aria-pressed={learned} className="rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{learned ? "✓ 已学会（点击撤销）" : "我懂了"}</button>;
}
