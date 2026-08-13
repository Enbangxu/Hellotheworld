import { describe, expect, it } from "vitest";
import { parseTutorRequest, parseTutorResponse } from "@/src/lib/learning-schema";
describe("tutor schemas", () => {
  it("rejects invalid locale, topic, request text and history", () => {
    expect(parseTutorRequest({ locale: "xx", topicId: "x", mode: "ask" })).toBeUndefined();
    expect(parseTutorRequest({ locale: "zh", topicId: "x".repeat(101), mode: "ask" })).toBeUndefined();
    expect(parseTutorRequest({ locale: "zh", topicId: "x", mode: "ask", question: "x".repeat(1001) })).toBeUndefined();
    expect(parseTutorRequest({ locale: "zh", topicId: "x", mode: "ask", history: Array(9).fill({ role: "user", text: "x" }) })).toBeUndefined();
  });
  it("accepts no more than eight safe history messages", () => expect(parseTutorRequest({ locale: "zh", topicId: "x", mode: "ask", history: Array(8).fill({ role: "model", text: "x" }) })?.history).toHaveLength(8));
  it("validates output", () => { expect(parseTutorResponse({ answer: "a", steps: [], keyInsight: "k" })?.answer).toBe("a"); expect(parseTutorResponse({ answer: "" })).toBeUndefined(); });
});
