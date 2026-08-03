import { describe, expect, it } from "vitest";
import { normalizeExplanation, normalizeKeywords } from "../keywords";

describe("keyword normalization", () => {
  it("validates, deduplicates, and limits keyword output", () => {
    const keywords = normalizeKeywords({ keywords: [
      { word: "DeepSeek", importance: "high", category: "AI" },
      { word: "deepseek", importance: "invalid", category: "duplicate" },
      { word: "RAG", category: "architecture" }, { word: "Agents" }, { word: "LLM" },
      { word: "Prompt" }, { word: "Vector" }, { word: "Embedding" }, { word: "Extra" },
    ] });
    expect(keywords).toHaveLength(8);
    expect(keywords[0]).toEqual({ word: "DeepSeek", importance: "high", category: "AI" });
    expect(keywords[1]).toEqual({ word: "RAG", importance: "medium", category: "architecture" });
  });

  it("rejects incomplete explanations and sanitizes lists", () => {
    expect(normalizeExplanation({}, "RAG")).toBeNull();
    expect(normalizeExplanation({ explanation: "Retrieval augmented generation", useCases: ["Search", 2], relatedKeywords: ["Vectors"] }, "RAG"))
      .toEqual({ word: "RAG", explanation: "Retrieval augmented generation", useCases: ["Search"], relatedKeywords: ["Vectors"] });
  });
});
