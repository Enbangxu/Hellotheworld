export type LearningLocale = "zh" | "en" | "ja";
export type LocalizedText = Record<LearningLocale, string>;
export type QuickCheck = { question: LocalizedText; options?: LocalizedText[]; answer: LocalizedText; explanation: LocalizedText };
export type Topic = { id: string; slug: string; title: LocalizedText; chapterId: string; learningObjective: LocalizedText; tenSecondSummary: LocalizedText; analogy: LocalizedText; keyPoints: LocalizedText[]; methodSteps: LocalizedText[]; commonMistakes: LocalizedText[]; formula?: string; workedExample?: LocalizedText; quickCheck: QuickCheck; relatedTopicIds: string[]; keywords: string[] };
export type Chapter = { id: string; slug: string; title: LocalizedText; description: LocalizedText; order: number; topics: Topic[] };
export type Subject = { id: string; slug: string; name: LocalizedText; shortDescription: LocalizedText; icon: string; color: string; curriculum: string; edition: string; grade: 9; semester: "first"; chapters: Chapter[] };
