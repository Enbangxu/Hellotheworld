import type { LearningLocale } from "@/src/data/grade9";
export const tutorModes = ["ask", "simplify", "example"] as const;
export type TutorMode = (typeof tutorModes)[number];
export type TutorRequest = { locale: LearningLocale; topicId: string; mode: TutorMode; question?: string; history?: Array<{ role: "user" | "model"; text: string }> };
export type TutorResponse = { answer: string; example?: string };
export function parseTutorRequest(value: unknown): TutorRequest | undefined {
  if (!value || typeof value !== "object") return;
  const input = value as Record<string, unknown>;
  if (!( ["zh", "en", "ja"] as unknown[]).includes(input.locale) || typeof input.topicId !== "string" || input.topicId.length > 100 || !tutorModes.includes(input.mode as TutorMode)) return;
  if ((typeof input.question === "string" && input.question.length > 1000) || (input.history !== undefined && (!Array.isArray(input.history) || input.history.length > 8 || input.history.some((entry) => !entry || typeof entry !== "object" || !["user", "model"].includes((entry as { role?: string }).role ?? "") || typeof (entry as { text?: unknown }).text !== "string" || ((entry as { text: string }).text.length > 1000))))) return;
  return input as TutorRequest;
}
export function parseTutorResponse(value: unknown): TutorResponse | undefined {
  if (!value || typeof value !== "object") return;
  const output = value as Record<string, unknown>;
  if (typeof output.answer !== "string" || !output.answer.trim() || (output.example !== undefined && typeof output.example !== "string")) return;
  return { answer: output.answer, ...(typeof output.example === "string" && output.example.trim() ? { example: output.example } : {}) };
}
