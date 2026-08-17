import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { subjects } from "@/src/data/grade9";
import {
  allTopics,
  getSubject,
  getTopic,
  getTopicBySlug,
} from "@/src/lib/grade9-curriculum";
import { getTwentySecondLesson } from "@/src/lib/twenty-second-lesson";

const compact = (value: string) => value.replace(/[\s，。；：、“”‘’（）]/g, "");
const quickText = (topic: ReturnType<typeof allTopics>[number]["topic"]) => {
  const q = topic.quickLesson;
  return [
    q.meaning.zh,
    q.plainExplanation.zh,
    q.microExample.setup.zh,
    q.microExample.thinking.zh,
    q.microExample.result.zh,
    q.useWhen.zh,
    q.memoryLine.zh,
  ].join("|");
};
const topic = (id: string) => {
  const value = getTopic(id);
  if (!value) throw new Error(`missing topic ${id}`);
  return value;
};

describe("grade 9 20-second curriculum", () => {
  it("keeps all seven subjects and all 83 topic identities", () => {
    expect(subjects.map((subject) => subject.slug)).toEqual([
      "chinese",
      "mathematics",
      "english",
      "physics",
      "chemistry",
      "morality-law",
      "history",
    ]);
    expect(allTopics()).toHaveLength(83);
    const ids = allTopics().map(({ topic }) => topic.id);
    expect(new Set(ids).size).toBe(83);
    for (const { subject, topic } of allTopics()) {
      expect(getTopicBySlug(subject.slug, topic.slug)?.id).toBe(topic.id);
      expect(topic.relatedTopicIds.every((id) => getTopic(id))).toBe(true);
    }
  });

  it("gives every topic a complete, concise and unique quick lesson", () => {
    const lessons = new Set<string>();
    const forbidden = [
      "条件是起点",
      "规则是路线",
      "结论是终点",
      "先读清对象、条件与问题",
      "圈出关键词和已知条件",
      "匹配对应概念或公式",
      "待补充",
      "TODO",
      "Lorem ipsum",
    ];
    for (const { topic } of allTopics()) {
      const q = topic.quickLesson;
      const fields = [
        q.meaning.zh,
        q.plainExplanation.zh,
        q.microExample.setup.zh,
        q.microExample.thinking.zh,
        q.microExample.result.zh,
        q.useWhen.zh,
        q.memoryLine.zh,
      ];
      fields.forEach((field) => expect(field.trim()).not.toBe(""));
      expect(compact(q.meaning.zh).length).toBeLessThanOrEqual(55);
      expect(compact(q.plainExplanation.zh).length).toBeLessThanOrEqual(90);
      expect(
        compact(
          q.microExample.setup.zh +
            q.microExample.thinking.zh +
            q.microExample.result.zh,
        ).length,
      ).toBeLessThanOrEqual(120);
      expect(compact(q.useWhen.zh).length).toBeLessThanOrEqual(45);
      expect(compact(q.memoryLine.zh).length).toBeLessThanOrEqual(45);
      const content = quickText(topic);
      forbidden.forEach((phrase) => expect(content).not.toContain(phrase));
      lessons.add(content);
      expect(
        topic.quickCheck.options.some(
          (option) => option.zh === topic.quickCheck.answer.zh,
        ),
      ).toBe(true);
    }
    expect(lessons.size).toBe(83);
  });

  it("retains formulas and correct definitions in regression topics", () => {
    expect(quickText(topic("chinese.argument.argument-structure"))).toMatch(
      /论点.*论据.*论证/,
    );
    expect(quickText(topic("mathematics.quadratic-equations.vieta"))).toMatch(
      /-b\/a.*c\/a/,
    );
    expect(quickText(topic("mathematics.quadratic-functions.graph"))).toMatch(
      /y=ax²\+bx\+c.*x=-b\/2a/,
    );
    expect(quickText(topic("physics.ohms-law.ohm"))).toMatch(/I=U\/R.*V.*Ω.*A/);
    expect(quickText(topic("chemistry.equations.balancing"))).toMatch(
      /原子.*2H₂ \+ O₂ = 2H₂O/,
    );
    expect(quickText(topic("english.grammar.passive-voice"))).toMatch(
      /be \+ 过去分词.*Tea is grown/,
    );
    expect(quickText(topic("history.capitalism.american-french"))).toMatch(
      /独立战争.*法国大革命.*自由平等/,
    );
  });

  it("keeps every localized required lesson within the 36/28/28 limits", () => {
    for (const { topic } of allTopics()) {
      for (const locale of ["zh", "en", "ja"] as const) {
        const lesson = getTwentySecondLesson(topic, locale);
        expect(Array.from(lesson.core).length).toBeLessThanOrEqual(36);
        expect(Array.from(lesson.setup).length).toBeLessThanOrEqual(28);
        expect(Array.from(lesson.result).length).toBeLessThanOrEqual(28);
        expect(Array.from(lesson.core + lesson.setup + lesson.result).length).toBeLessThanOrEqual(92);
        expect(lesson.core.trim()).not.toBe("");
        expect(lesson.setup.trim()).not.toBe("");
        expect(lesson.result.trim()).not.toBe("");
      }
    }
  });

  it("renders the concise main flow and three collapsed optional tools", () => {
    const route = readFileSync(
      "src/components/learning/TopicLearningRoute.tsx",
      "utf8",
    );
    const page = readFileSync(
      "src/app/[locale]/knowledge/grade-9/[subject]/[topic]/page.tsx",
      "utf8",
    );
    const lesson = readFileSync(
      "src/components/learning/CompleteLesson.tsx",
      "utf8",
    );
    const tutor = readFileSync(
      "src/components/learning/TutorPanel.tsx",
      "utf8",
    );
    ["20 秒核心", "只看一句话和一个关系", "先记这一句", "一眼看懂"].forEach(
      (text) => expect(route).toContain(text),
    );
    expect(page).toContain("知识链");
    expect(page).toContain("它不是孤立的一页");
    expect(route).not.toContain("从第1步开始");
    expect(route).not.toContain("microLessons.map");
    expect(page).not.toContain("从第1步开始");
    expect(page.match(/<details/g)).toHaveLength(3);
    expect(page).not.toMatch(/<details[^>]*\sopen/);
    ["可选：用1道题确认是否理解", "可选：问AI导师", "可选：展开完整讲解"].forEach(
      (text) => expect(page).toContain(text),
    );
    expect(page).toContain("<QuickCheck");
    expect(page).toContain("<TutorPanel");
    expect(lesson).not.toContain("30 秒弄懂");
    expect(lesson).not.toContain("<QuickCheck");
    expect(lesson).not.toContain("<LearningProgress");
    expect(tutor).toContain('run("simplify"');
    expect(tutor).toContain("简单解释");
    expect(tutor).toContain("最关键的一句话");
  });

  it("looks up subjects", () =>
    expect(getSubject("mathematics")?.id).toBe("mathematics"));
});
