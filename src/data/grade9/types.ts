export type LearningLocale = "zh" | "en" | "ja";
export type LocalizedText = Record<LearningLocale, string>;
export type InstantLesson = {
  plainMeaning: LocalizedText;
  concreteExample: LocalizedText;
  essentialFormula?: string;
  formulaExplanation?: LocalizedText;
};
export type QuickLesson = {
  meaning: LocalizedText;
  plainExplanation: LocalizedText;
  microExample: {
    setup: LocalizedText;
    thinking: LocalizedText;
    result: LocalizedText;
  };
  useWhen: LocalizedText;
  memoryLine: LocalizedText;
};
export type QuickCheck = {
  question: LocalizedText;
  options: LocalizedText[];
  answer: LocalizedText;
  explanation: LocalizedText;
};
export type LessonSection = {
  id: string;
  title: LocalizedText;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
  formula?: string;
};
export type WorkedExample = {
  title: LocalizedText;
  problem: LocalizedText;
  steps: LocalizedText[];
  answer: LocalizedText;
  explanation: LocalizedText;
};
export type CommonMistake = {
  mistake: LocalizedText;
  whyWrong: LocalizedText;
  correction: LocalizedText;
};
export type Topic = {
  id: string;
  slug: string;
  title: LocalizedText;
  chapterId: string;
  instantLesson: InstantLesson;
  quickLesson: QuickLesson;
  learningObjective: LocalizedText;
  prerequisites: LocalizedText[];
  introduction: LocalizedText;
  sections: LessonSection[];
  methodSteps: LocalizedText[];
  workedExamples: WorkedExample[];
  commonMistakes: CommonMistake[];
  formula?: string;
  quickCheck: QuickCheck;
  relatedTopicIds: string[];
  keywords: string[];
};
export type Chapter = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  order: number;
  topics: Topic[];
};
export type Subject = {
  id: string;
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  icon: string;
  color: string;
  curriculum: string;
  edition: string;
  grade: 9;
  semester: "first";
  chapters: Chapter[];
};
