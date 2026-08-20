import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { curriculumCoverage, subjects } from "@/src/data/grade9";
import { legacyTopicIds } from "@/src/data/grade9/legacy-topic-ids";
import { allTopics, getTopic, getTopicBySlug } from "@/src/lib/grade9-curriculum";
import { generateStaticParams as generateTopicParams } from "@/src/app/[locale]/knowledge/grade-9/[subject]/[topic]/page";
const compact = (value: string) => value.replace(/[\s，。；：、“”‘’（）《》！？,.!?]/g, "");
const legacyIds = [...legacyTopicIds];
const forbidden = ["第1步", "第一步", "学习路线", "TODO", "待补充", "暂无内容", "示例内容", "记住这个知识点", "想想这个知识点"];
describe("grade 9 instant curriculum", () => {
  it("keeps seven subjects and all legacy public topic ids and URLs", () => {
    expect(subjects.map((subject) => subject.slug)).toEqual(["chinese", "mathematics", "english", "physics", "chemistry", "morality-law", "history"]);
    const ids = new Set(allTopics().map(({ topic }) => topic.id));
    legacyIds.forEach((id) => expect(ids.has(id)).toBe(true));
    for (const { subject, topic } of allTopics()) expect(getTopicBySlug(subject.slug, topic.slug)?.id).toBe(topic.id);
  });
  it("has unique ids and slugs with complete concise Chinese instant lessons", () => {
    const all = allTopics();
    expect(new Set(all.map(({ topic }) => topic.id)).size).toBe(all.length);
    expect(new Set(all.map(({ subject, topic }) => `${subject.slug}/${topic.slug}`)).size).toBe(all.length);
    for (const { topic } of all) {
      expect(topic.id.trim()).not.toBe(""); expect(topic.slug.trim()).not.toBe(""); expect(topic.title.zh.trim()).not.toBe(""); expect(topic.keywords.length).toBeGreaterThan(0);
      const lesson = topic.instantLesson;
      expect(lesson.plainMeaning.zh.trim()).not.toBe(""); expect(lesson.concreteExample.zh.trim()).not.toBe(""); expect(lesson.memoryAnchor.zh.trim()).not.toBe(""); expect(lesson.recallPrompt.zh.trim()).not.toBe("");
      expect(compact(lesson.plainMeaning.zh).length).toBeLessThanOrEqual(70); expect(compact(lesson.concreteExample.zh).length).toBeLessThanOrEqual(55);
      expect(compact(lesson.memoryAnchor.zh).length).toBeLessThanOrEqual(24); expect(compact(lesson.recallPrompt.zh).length).toBeLessThanOrEqual(35);
      forbidden.forEach((phrase) => expect(JSON.stringify(topic)).not.toContain(phrase));
      if (lesson.essentialFormula) expect(lesson.formulaExplanation?.zh.trim()).not.toBe("");
    }
  });
  it("maps every textbook chapter to real topics in coverage manifest", () => {
    const coverageKeys = new Set(curriculumCoverage.map((item) => `${item.subjectId}/${item.chapterId}`));
    const ids = new Set(allTopics().map(({ topic }) => topic.id));
    for (const subject of subjects) for (const chapter of subject.chapters) expect(coverageKeys.has(`${subject.id}/${chapter.id}`)).toBe(true);
    for (const item of curriculumCoverage) { expect(item.status).toBe("covered"); expect(item.topicIds.length).toBeGreaterThan(0); item.topicIds.forEach((id) => expect(ids.has(id)).toBe(true)); }
  });
  it("keeps key facts accurate", () => {
    expect(getTopic("mathematics.quadratic-equations.vieta")?.instantLesson.essentialFormula).toMatch(/x₁\+x₂=-b\/a/);
    expect(getTopic("physics.ohms-law.ohm")?.instantLesson).toMatchObject({ essentialFormula: "I=U/R" });
    expect(getTopic("english.grammar.passive-voice")?.title.zh).toMatch(/被动语态/);
  });
  it("generates static params and lookup/search targets for every topic", () => {
    const params = new Set(generateTopicParams().map((item) => `${item.subject}/${item.topic}`));
    for (const { subject, topic } of allTopics()) {
      expect(getTopic(topic.id)?.id).toBe(topic.id); expect(getTopicBySlug(subject.slug, topic.slug)?.id).toBe(topic.id);
      expect(params.has(`${subject.slug}/${topic.slug}`)).toBe(true);
      expect(`${topic.title.zh} ${topic.keywords.join(" ")}`.length).toBeGreaterThan(0);
      topic.relatedTopicIds.forEach((id) => expect(getTopic(id)).toBeTruthy());
    }
  });
  it("keeps legacy micro redirects and lightweight page flow", () => {
    const page = readFileSync("src/app/[locale]/knowledge/grade-9/[subject]/[topic]/page.tsx", "utf8");
    const card = readFileSync("src/components/learning/InstantLessonCard.tsx", "utf8");
    const legacy = readFileSync("src/app/[locale]/knowledge/grade-9/[subject]/[topic]/[micro]/page.tsx", "utf8");
    const browser = readFileSync("src/components/learning/SubjectTopicBrowser.tsx", "utf8");
    expect(page).not.toMatch(/microLessons\.map|LearningProgress|知识链/); expect(card).toContain("我来回想"); expect(card).toContain("查看答案");
    expect(legacy).toContain("permanentRedirect"); expect(browser).toContain("overflow-hidden"); expect(browser).toContain("章节内搜索");
  });
});
