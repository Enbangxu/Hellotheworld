export const V23_PROGRESS_KEY = "v23-grade9-learning-progress";
export const V22_PROGRESS_KEY = "v22-grade9-progress";
export const PROGRESS_EVENT = "v23-learning-progress";

export type TopicProgress = {
  topicId: string;
  attempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
  mastery: number;
  lastStudiedAt?: string;
  learnedAt?: string;
  nextReviewAt?: string;
};

export type LearningProgressV23 = {
  version: 23;
  topics: Record<string, TopicProgress>;
  recentTopicIds: string[];
  studyDates: string[];
};

export type V22Progress = { learned?: unknown; recent?: unknown; checks?: unknown };

export function createEmptyProgress(): LearningProgressV23 {
  return { version: 23, topics: {}, recentTopicIds: [], studyDates: [] };
}

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
export function calculateMastery(attempts: number, correctAttempts: number, consecutiveCorrect: number, learned = false): number {
  if (attempts <= 0) return learned ? 50 : 0;
  return clamp((correctAttempts / attempts) * 70 + Math.min(consecutiveCorrect, 3) * 10 + (learned ? 10 : 0));
}

function localDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(iso: string, days: number): string {
  const date = new Date(iso); date.setDate(date.getDate() + days); return date.toISOString();
}

function baseTopic(topicId: string): TopicProgress {
  return { topicId, attempts: 0, correctAttempts: 0, consecutiveCorrect: 0, mastery: 0 };
}

function withStudyDate(progress: LearningProgressV23, now: Date): LearningProgressV23 {
  const day = localDate(now);
  return { ...progress, studyDates: [...new Set([...progress.studyDates, day])].sort() };
}

export function migrateV22Progress(value: unknown, now = new Date()): LearningProgressV23 {
  if (!value || typeof value !== "object") return createEmptyProgress();
  const old = value as V22Progress;
  const learned = Array.isArray(old.learned) ? old.learned.filter((id): id is string => typeof id === "string") : [];
  const recent = Array.isArray(old.recent) ? old.recent.filter((id): id is string => typeof id === "string") : [];
  const checks = old.checks && typeof old.checks === "object" ? old.checks as Record<string, unknown> : {};
  const ids = new Set([...learned, ...recent, ...Object.keys(checks)]);
  const topics: Record<string, TopicProgress> = {};
  for (const topicId of ids) {
    const checked = typeof checks[topicId] === "boolean";
    const correct = checks[topicId] === true;
    const isLearned = learned.includes(topicId);
    topics[topicId] = {
      ...baseTopic(topicId), attempts: checked ? 1 : 0, correctAttempts: correct ? 1 : 0,
      consecutiveCorrect: correct ? 1 : 0, mastery: calculateMastery(checked ? 1 : 0, correct ? 1 : 0, correct ? 1 : 0, isLearned),
      lastStudiedAt: recent.includes(topicId) ? now.toISOString() : undefined,
      learnedAt: isLearned ? now.toISOString() : undefined,
      nextReviewAt: checked ? addDays(now.toISOString(), correct ? 2 : 1) : undefined,
    };
  }
  return { version: 23, topics, recentTopicIds: recent.slice(0, 10), studyDates: recent.length ? [localDate(now)] : [] };
}

export function recordTopicVisit(progress: LearningProgressV23, topicId: string, now = new Date()): LearningProgressV23 {
  const iso = now.toISOString();
  const topic = { ...(progress.topics[topicId] ?? baseTopic(topicId)), lastStudiedAt: iso };
  return withStudyDate({ ...progress, topics: { ...progress.topics, [topicId]: topic }, recentTopicIds: [topicId, ...progress.recentTopicIds.filter((id) => id !== topicId)].slice(0, 10) }, now);
}

export function recordQuizAttempt(progress: LearningProgressV23, topicId: string, correct: boolean, now = new Date()): LearningProgressV23 {
  const previous = progress.topics[topicId] ?? baseTopic(topicId);
  const attempts = previous.attempts + 1;
  const correctAttempts = previous.correctAttempts + (correct ? 1 : 0);
  const consecutiveCorrect = correct ? previous.consecutiveCorrect + 1 : 0;
  const interval = correct ? consecutiveCorrect === 1 ? 2 : consecutiveCorrect === 2 ? 4 : consecutiveCorrect === 3 ? 7 : consecutiveCorrect === 4 ? 14 : 30 : 1;
  const topic: TopicProgress = { ...previous, attempts, correctAttempts, consecutiveCorrect, mastery: calculateMastery(attempts, correctAttempts, consecutiveCorrect, Boolean(previous.learnedAt)), lastStudiedAt: now.toISOString(), nextReviewAt: addDays(now.toISOString(), interval) };
  return withStudyDate({ ...progress, topics: { ...progress.topics, [topicId]: topic }, recentTopicIds: [topicId, ...progress.recentTopicIds.filter((id) => id !== topicId)].slice(0, 10) }, now);
}

export function markTopicLearned(progress: LearningProgressV23, topicId: string, learned = true, now = new Date()): LearningProgressV23 {
  const previous = progress.topics[topicId] ?? baseTopic(topicId);
  const topic = { ...previous, learnedAt: learned ? now.toISOString() : undefined, lastStudiedAt: now.toISOString(), mastery: calculateMastery(previous.attempts, previous.correctAttempts, previous.consecutiveCorrect, learned) };
  return withStudyDate({ ...progress, topics: { ...progress.topics, [topicId]: topic }, recentTopicIds: [topicId, ...progress.recentTopicIds.filter((id) => id !== topicId)].slice(0, 10) }, now);
}

export function getDueTopics(progress: LearningProgressV23, now = new Date()): TopicProgress[] {
  return Object.values(progress.topics).filter((topic) => topic.nextReviewAt && new Date(topic.nextReviewAt) <= now).sort((a, b) => String(a.nextReviewAt).localeCompare(String(b.nextReviewAt)));
}
export function getWeakTopics(progress: LearningProgressV23, limit = 5): TopicProgress[] {
  return Object.values(progress.topics).filter((topic) => topic.attempts > 0 || topic.learnedAt).sort((a, b) => a.mastery - b.mastery || b.attempts - a.attempts).slice(0, limit);
}
export function getSubjectProgress(progress: LearningProgressV23, topicIds: string[]) {
  const values = topicIds.map((id) => progress.topics[id]);
  const learned = values.filter((topic) => topic?.learnedAt).length;
  const mastery = topicIds.length ? Math.round(values.reduce((sum, topic) => sum + (topic?.mastery ?? 0), 0) / topicIds.length) : 0;
  return { total: topicIds.length, learned, mastery };
}
export function calculateStudyStreak(studyDates: string[], now = new Date()): number {
  const days = new Set(studyDates.filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day)));
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!days.has(localDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(localDate(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

function isProgress(value: unknown): value is LearningProgressV23 {
  return Boolean(value && typeof value === "object" && (value as { version?: unknown }).version === 23 && (value as LearningProgressV23).topics && Array.isArray((value as LearningProgressV23).recentTopicIds) && Array.isArray((value as LearningProgressV23).studyDates));
}
export function readLearningProgress(storage: Pick<Storage, "getItem" | "setItem"> = localStorage): LearningProgressV23 {
  try {
    const current = JSON.parse(storage.getItem(V23_PROGRESS_KEY) ?? "null");
    if (isProgress(current)) return current;
    const old = JSON.parse(storage.getItem(V22_PROGRESS_KEY) ?? "null");
    const migrated = migrateV22Progress(old); storage.setItem(V23_PROGRESS_KEY, JSON.stringify(migrated)); return migrated;
  } catch { return createEmptyProgress(); }
}
export function writeLearningProgress(progress: LearningProgressV23, storage: Pick<Storage, "setItem"> = localStorage) {
  storage.setItem(V23_PROGRESS_KEY, JSON.stringify(progress));
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
}
