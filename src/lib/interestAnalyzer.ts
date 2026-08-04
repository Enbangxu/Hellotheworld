export type InterestEntry = { keyword: string; category: string; weight: number; clicks: number; updatedAt: number };

const STORAGE_KEY = "hello-v18-interests";

export function rankInterests(entries: InterestEntry[]): InterestEntry[] {
  return [...entries].sort((a, b) => b.weight - a.weight || b.updatedAt - a.updatedAt);
}

export function recordInterest(entries: InterestEntry[], keyword: string, category = "概念", now = Date.now()): InterestEntry[] {
  const normalized = keyword.trim();
  if (!normalized) return rankInterests(entries);
  const existing = entries.find((entry) => entry.keyword.toLocaleLowerCase() === normalized.toLocaleLowerCase());
  const next = existing
    ? entries.map((entry) => entry === existing ? { ...entry, clicks: entry.clicks + 1, weight: Number((entry.weight + 1 + Math.min(entry.clicks, 5) * .1).toFixed(2)), updatedAt: now } : entry)
    : [...entries, { keyword: normalized, category, clicks: 1, weight: 1, updatedAt: now }];
  return rankInterests(next).slice(0, 30);
}

export function loadInterests(): InterestEntry[] {
  if (typeof window === "undefined") return [];
  try { return rankInterests(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]") as InterestEntry[]); }
  catch { return []; }
}

export function trackInterest(keyword: string, category?: string): InterestEntry[] {
  const next = recordInterest(loadInterests(), keyword, category);
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
