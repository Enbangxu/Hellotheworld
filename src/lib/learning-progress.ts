export const V24_PROGRESS_KEY = "v24-grade9-micro-learning-progress";
export const V23_PROGRESS_KEY = "v23-grade9-learning-progress";
export const V22_PROGRESS_KEY = "v22-grade9-progress";
export const PROGRESS_EVENT = "v24-learning-progress";

export type TopicProgress = { topicId: string; attempts: number; correctAttempts: number; consecutiveCorrect: number; mastery: number; lastStudiedAt?: string; learnedAt?: string; nextReviewAt?: string };
export type LearningProgressV23 = { version: 24; topics: Record<string, TopicProgress>; recentTopicIds: string[]; studyDates: string[] };
type Legacy = { version?: number; topics?: Record<string, TopicProgress>; recentTopicIds?: string[]; studyDates?: string[]; learned?: unknown; recent?: unknown; checks?: unknown };
export const createEmptyProgress = (): LearningProgressV23 => ({ version: 24, topics: {}, recentTopicIds: [], studyDates: [] });
const clamp = (n:number) => Math.max(0,Math.min(100,Math.round(n)));
export const calculateMastery = (attempts:number, correct:number, consecutive:number, learned=false) => attempts > 0 ? clamp(correct/attempts*70+Math.min(consecutive,3)*10+(learned?10:0)) : learned?50:0;
const day=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const addDays=(d:Date,n:number)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x.toISOString()};
const studied=(p:LearningProgressV23,now:Date)=>({...p,studyDates:[...new Set([...p.studyDates,day(now)])].sort()});

/** Migrates older stored progress while discarding retired micro-lesson state. */
export function migrateV23Progress(value: unknown): LearningProgressV23 {
  if (!value || typeof value !== "object") return createEmptyProgress();
  const legacy = value as Legacy;
  if (legacy.version === 23 || legacy.version === 24) return { version: 24, topics: legacy.topics ?? {}, recentTopicIds: legacy.recentTopicIds ?? [], studyDates: legacy.studyDates ?? [] };
  return migrateV22Progress(value);
}
export function migrateV22Progress(value:unknown,now=new Date()):LearningProgressV23 { const p=createEmptyProgress(); if(!value||typeof value!=="object")return p; const v=value as Legacy; const learned=Array.isArray(v.learned)?v.learned.filter((x):x is string=>typeof x==="string"):[]; const recent=Array.isArray(v.recent)?v.recent.filter((x):x is string=>typeof x==="string"):[]; const checks=v.checks&&typeof v.checks==="object"?v.checks as Record<string,unknown>:{}; for(const id of new Set([...learned,...recent,...Object.keys(checks)])){const correct=checks[id]===true,attempted=typeof checks[id]==="boolean";p.topics[id]={topicId:id,attempts:+attempted,correctAttempts:+correct,consecutiveCorrect:+correct,mastery:calculateMastery(+attempted,+correct,+correct,learned.includes(id)),learnedAt:learned.includes(id)?now.toISOString():undefined,lastStudiedAt:recent.includes(id)?now.toISOString():undefined};} p.recentTopicIds=recent.slice(0,10);p.studyDates=recent.length?[day(now)]:[];return p; }
export function getSubjectProgress(p:LearningProgressV23,ids:string[]){const values=ids.map(id=>p.topics[id]);const learned=values.filter(x=>x?.learnedAt).length;return {total:ids.length,learned,mastery:ids.length?Math.round(values.reduce((sum,value)=>sum+(value?.mastery??0),0)/ids.length):0}}
export const getDueTopics=(p:LearningProgressV23,now=new Date())=>Object.values(p.topics).filter(x=>x.nextReviewAt&&new Date(x.nextReviewAt)<=now);
export const getWeakTopics=(p:LearningProgressV23,limit=5)=>Object.values(p.topics).filter(x=>x.attempts).sort((a,b)=>a.mastery-b.mastery).slice(0,limit);
export function calculateStudyStreak(ds:string[],now=new Date()){const set=new Set(ds),d=new Date(now.getFullYear(),now.getMonth(),now.getDate());if(!set.has(day(d)))d.setDate(d.getDate()-1);let n=0;while(set.has(day(d))){n++;d.setDate(d.getDate()-1)}return n}
// Legacy topic visit APIs remain for historical records only.
export function recordTopicVisit(p:LearningProgressV23,id:string,now=new Date()){const x=p.topics[id]??{topicId:id,attempts:0,correctAttempts:0,consecutiveCorrect:0,mastery:0};return studied({...p,topics:{...p.topics,[id]:{...x,lastStudiedAt:now.toISOString()}},recentTopicIds:[id,...p.recentTopicIds.filter(y=>y!==id)].slice(0,10)},now)}
export function recordQuizAttempt(p:LearningProgressV23,id:string,correct:boolean,now=new Date()){const x=p.topics[id]??{topicId:id,attempts:0,correctAttempts:0,consecutiveCorrect:0,mastery:0};const attempts=x.attempts+1,c=x.correctAttempts+(correct?1:0),cc=correct?x.consecutiveCorrect+1:0;const q=recordTopicVisit(p,id,now);const interval=correct?(cc===1?2:cc===2?4:cc===3?7:cc===4?14:30):1;return {...q,topics:{...q.topics,[id]:{...x,attempts,correctAttempts:c,consecutiveCorrect:cc,mastery:calculateMastery(attempts,c,cc),lastStudiedAt:now.toISOString(),nextReviewAt:addDays(now,interval)}}}}
export function markTopicLearned(p:LearningProgressV23,id:string,learned=true,now=new Date()){const q=recordTopicVisit(p,id,now),x=q.topics[id];return {...q,topics:{...q.topics,[id]:{...x,learnedAt:learned?now.toISOString():undefined}}}}
export function readLearningProgress(storage:Pick<Storage,"getItem"|"setItem">=localStorage){try{const current=JSON.parse(storage.getItem(V24_PROGRESS_KEY)??"null");if(current?.version===24)return migrateV23Progress(current);const old=JSON.parse(storage.getItem(V23_PROGRESS_KEY)??storage.getItem(V22_PROGRESS_KEY)??"null");const p=migrateV23Progress(old);storage.setItem(V24_PROGRESS_KEY,JSON.stringify(p));return p}catch{return createEmptyProgress()}}
export function writeLearningProgress(p:LearningProgressV23,storage:Pick<Storage,"setItem">=localStorage){storage.setItem(V24_PROGRESS_KEY,JSON.stringify(p));if(typeof window!=="undefined")window.dispatchEvent(new CustomEvent(PROGRESS_EVENT))}
