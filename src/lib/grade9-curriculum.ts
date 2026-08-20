import { subjects, type LearningLocale, type LocalizedText, type Topic } from "@/src/data/grade9";
export const getSubject = (slug: string) => subjects.find((subject) => subject.slug === slug);
export const getTopic = (topicId: string): Topic | undefined => subjects.flatMap((s) => s.chapters).flatMap((c) => c.topics).find((topic) => topic.id === topicId);
export const getTopicBySlug = (subjectSlug: string, topicSlug: string) => getSubject(subjectSlug)?.chapters.flatMap((c) => c.topics).find((topic) => topic.slug === topicSlug);
export const allTopics = () => subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.topics.map((topic) => ({ subject, chapter, topic }))));
export const localize = (value: LocalizedText, locale: LearningLocale) => value[locale] || value.zh;
export const curriculumStats = subjects.map((subject) => ({ subject: subject.name.zh, chapters: subject.chapters.length, topics: subject.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0) }));
