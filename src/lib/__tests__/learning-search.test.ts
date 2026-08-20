import { describe, expect, it } from "vitest";
import { subjects } from "@/src/data/grade9";
import { searchLearningTopics } from "@/src/components/learning/LearningSearch";
describe("learning search", () => { it("matches titles, keywords, chapters and subjects", () => { const first = subjects[0].chapters[0].topics[0]; expect(searchLearningTopics(subjects, first.title.zh, "", "zh").some((x) => x.topicId === first.id)).toBe(true); expect(searchLearningTopics(subjects, first.keywords[0], "", "en").some((x) => x.topicId === first.id)).toBe(true); expect(searchLearningTopics(subjects, subjects[0].chapters[0].title.zh, "", "ja").length).toBeGreaterThan(0); expect(searchLearningTopics(subjects, subjects[0].name.zh, subjects[0].id, "en").length).toBeGreaterThan(0); }); });
