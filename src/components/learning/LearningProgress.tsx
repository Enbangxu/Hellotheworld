"use client";
import { useEffect, useState } from "react";
const KEY = "v22-grade9-progress";
type Progress = { learned: string[]; recent: string[]; checks: Record<string, boolean> };
const empty: Progress = { learned: [], recent: [], checks: {} };
export function readProgress(): Progress { try { return JSON.parse(localStorage.getItem(KEY) ?? "null") ?? empty; } catch { return empty; } }
export function recordCheck(topicId: string, correct: boolean) { const value = readProgress(); value.checks[topicId] = correct; localStorage.setItem(KEY, JSON.stringify(value)); }
export function LearningProgress({ topicId }: { topicId: string }) { const [learned, setLearned] = useState(false); useEffect(() => { const value = readProgress(); setLearned(value.learned.includes(topicId)); value.recent = [topicId, ...value.recent.filter((id) => id !== topicId)].slice(0, 10); localStorage.setItem(KEY, JSON.stringify(value)); }, [topicId]); const mark = () => { const value = readProgress(); value.learned = [...new Set([...value.learned, topicId])]; localStorage.setItem(KEY, JSON.stringify(value)); setLearned(true); }; return <button type="button" onClick={mark} aria-pressed={learned} className="rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{learned ? "✓ 已学会" : "我懂了"}</button> }
