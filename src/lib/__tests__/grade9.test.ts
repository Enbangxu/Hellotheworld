import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { subjects } from "@/src/data/grade9";
import { allTopics, getTopic, getTopicBySlug } from "@/src/lib/grade9-curriculum";
const compact = (value: string) => value.replace(/[\s，。；：、“”‘’（）《》！？,.!?]/g, "");
const forbidden = ["第1步", "第一步", "学习路线", "TODO", "待补充", "记住这个知识点", "想想这个知识点"];
describe("grade 9 instant curriculum", () => {
  it("keeps seven subjects and all 83 public topic ids and URLs", () => {
    expect(subjects.map((subject) => subject.slug)).toEqual(["chinese", "mathematics", "english", "physics", "chemistry", "morality-law", "history"]);
    expect(allTopics()).toHaveLength(83);
    expect(new Set(allTopics().map(({ topic }) => topic.id))).toHaveLength(83);
    for (const { subject, topic } of allTopics()) expect(getTopicBySlug(subject.slug, topic.slug)?.id).toBe(topic.id);
  });
  it("provides concise, non-template instant lessons for every topic", () => {
    const meanings = new Set<string>(); const examples = new Set<string>();
    const anchors = new Set<string>(); const prompts = new Set<string>();
    for (const { topic } of allTopics()) {
      const lesson = topic.instantLesson;
      expect(lesson.plainMeaning.zh.trim()).not.toBe(""); expect(lesson.concreteExample.zh.trim()).not.toBe("");
      expect(compact(lesson.plainMeaning.zh).length).toBeLessThanOrEqual(70);
      expect(compact(lesson.concreteExample.zh).length).toBeLessThanOrEqual(55);
      expect(lesson.memoryAnchor.zh.trim()).not.toBe(""); expect(lesson.recallPrompt.zh.trim()).not.toBe("");
      expect(compact(lesson.memoryAnchor.zh).length).toBeLessThanOrEqual(24);
      expect(compact(lesson.recallPrompt.zh).length).toBeLessThanOrEqual(35);
      expect(lesson.plainMeaning.en.trim()).not.toBe(""); expect(lesson.plainMeaning.ja.trim()).not.toBe("");
      forbidden.forEach((phrase) => expect(JSON.stringify(lesson)).not.toContain(phrase));
      meanings.add(lesson.plainMeaning.zh); examples.add(lesson.concreteExample.zh);
      anchors.add(lesson.memoryAnchor.zh); prompts.add(lesson.recallPrompt.zh);
    }
    expect(meanings.size).toBe(83); expect(examples.size).toBe(83);
    expect(anchors.size).toBe(83); expect(prompts.size).toBe(83);
  });
  it("keeps key facts accurate", () => {
    expect(getTopic("mathematics.quadratic-equations.vieta")?.instantLesson.plainMeaning.zh).toMatch(/-b\/a.*c\/a/);
    expect(getTopic("physics.ohms-law.ohm")?.instantLesson).toMatchObject({ essentialFormula: "I=U/R" });
    expect(getTopic("english.grammar.passive-voice")?.instantLesson.plainMeaning.zh).toMatch(/be \+ 过去分词/);
  });
  it("removes the old main-flow burdens and permanently redirects legacy URLs", () => {
    const page = readFileSync("src/app/[locale]/knowledge/grade-9/[subject]/[topic]/page.tsx", "utf8");
    const card = readFileSync("src/components/learning/InstantLessonCard.tsx", "utf8");
    const tutor = readFileSync("src/components/learning/TutorPanel.tsx", "utf8");
    const legacy = readFileSync("src/app/[locale]/knowledge/grade-9/[subject]/[topic]/[micro]/page.tsx", "utf8");
    expect(page).not.toMatch(/microLessons\.map|LearningProgress|知识链|<details/);
    expect(card).not.toMatch(/进度|第1步|学习路线/);
    expect(card).toContain("我来回想");
    expect(card).toContain("查看答案");
    expect(tutor).not.toMatch(/小步骤|keyInsight|followUpQuestion/);
    expect(legacy).toContain("permanentRedirect");
  });
  it("includes the memory anchor in the server-side DeepSeek context", () => {
    const deepSeek = readFileSync("src/lib/deepseek-tutor.ts", "utf8");
    expect(deepSeek).toMatch(/memoryAnchor: localize\(topic\.instantLesson\.memoryAnchor\)/);
  });
});
