import { describe, expect, it } from "vitest";
import { subjects } from "@/src/data/grade9";
import { allTopics, getSubject, getTopic, getTopicBySlug } from "@/src/lib/grade9-curriculum";

const forbidden = ["条件是起点，规则是路线，结论是终点", "先读清对象、条件与问题", "用定义、规律或证据建立联系", "回到题目检验结论", "圈出关键词和已知条件", "匹配对应概念或公式", "写出结论并检查", "待补充", "TODO", "示例内容", "Lorem ipsum"];
const body = (topic: ReturnType<typeof allTopics>[number]["topic"]) => JSON.stringify({ introduction: topic.introduction.zh, sections: topic.sections.map((section) => section.paragraphs.map((p) => p.zh)), examples: topic.workedExamples.map((example) => example.problem.zh) });

describe("grade 9 complete curriculum", () => {
  it("keeps all seven subjects and all 83 pre-existing topics", () => {
    expect(subjects.map((subject) => subject.slug)).toEqual(["chinese", "mathematics", "english", "physics", "chemistry", "morality-law", "history"]);
    expect(allTopics()).toHaveLength(83);
  });
  it("has unique and connected ids and slugs", () => {
    const ids: string[] = [], slugs: string[] = [];
    for (const subject of subjects) for (const chapter of subject.chapters) for (const topic of chapter.topics) {
      ids.push(topic.id); slugs.push(`${subject.slug}/${topic.slug}`);
      expect(topic.relatedTopicIds.every((id) => getTopic(id))).toBe(true);
    }
    expect(new Set(ids).size).toBe(ids.length); expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("requires substantial structured lessons rather than a shared short template", () => {
    const bodies = new Set<string>();
    for (const { topic } of allTopics()) {
      expect(topic.introduction.zh.length).toBeGreaterThanOrEqual(100);
      expect(topic.sections.length).toBeGreaterThanOrEqual(3);
      topic.sections.forEach((section) => { expect(section.paragraphs.length).toBeGreaterThan(0); section.paragraphs.forEach((paragraph) => expect(paragraph.zh.length).toBeGreaterThan(30)); });
      expect(topic.workedExamples.length).toBeGreaterThanOrEqual(1);
      topic.workedExamples.forEach((example) => { expect(example.problem.zh.length).toBeGreaterThan(20); expect(example.steps.length).toBeGreaterThanOrEqual(3); expect(example.answer.zh).toBeTruthy(); expect(example.explanation.zh).toBeTruthy(); });
      expect(topic.commonMistakes.length).toBeGreaterThanOrEqual(2);
      topic.commonMistakes.forEach((mistake) => { expect(mistake.mistake.zh).toBeTruthy(); expect(mistake.whyWrong.zh).toBeTruthy(); expect(mistake.correction.zh).toBeTruthy(); });
      expect(topic.quickCheck.options.some((option) => option.zh === topic.quickCheck.answer.zh)).toBe(true);
      const content = body(topic); forbidden.forEach((phrase) => expect(content).not.toContain(phrase)); bodies.add(content);
    }
    expect(bodies.size).toBe(allTopics().length);
  });
  it("looks up entries", () => { const first = allTopics()[0]; expect(getSubject(first.subject.slug)?.id).toBe(first.subject.id); expect(getTopicBySlug(first.subject.slug, first.topic.slug)?.id).toBe(first.topic.id); });
});
