import type { UserMemory } from "@/src/lib/memory";

export type RecommendableContent = { id: string; title: string; summary: string; category: string; tags: string[]; score?: number; reason?: string };
export type PersonalRecommendation = RecommendableContent & { score: number; reason: string };

export function createRecommendations(memory: Partial<UserMemory>, behavior: Partial<UserMemory["behavior"]>, content: RecommendableContent[]): PersonalRecommendation[] {
  const signals = [
    ...(memory.interests ?? []),
    ...(memory.behavior?.viewed ?? []),
    ...(memory.behavior?.saved ?? []),
    ...(behavior.viewed ?? []),
    ...(behavior.saved ?? []),
    ...(behavior.created ?? []),
  ].map((signal) => signal.toLowerCase());

  return content.map((item) => {
    const matches = item.tags.filter((tag) => signals.some((signal) => signal.includes(tag.toLowerCase()) || tag.toLowerCase().includes(signal))).length;
    return { ...item, score: Math.min(1, (item.score ?? 0.7) + matches * 0.06), reason: matches ? `Matched ${matches} personal signal${matches === 1 ? "" : "s"}` : item.reason ?? "Trending in your AI ecosystem" };
  }).sort((a, b) => b.score - a.score);
}
