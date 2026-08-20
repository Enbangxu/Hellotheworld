import { subjects } from "./curriculum";
export type CurriculumCoverageItem = { subjectId: string; chapterId: string; sourceSection: string; topicIds: string[]; status: "covered"; coverageScope?: string; };
export const curriculumCoverage: CurriculumCoverageItem[] = subjects.flatMap((subject) => subject.chapters.map((chapter) => ({ subjectId: subject.id, chapterId: chapter.id, sourceSection: `${subject.edition}：${chapter.title.zh}`, topicIds: chapter.topics.map((topic) => topic.id), status: "covered" as const, coverageScope: subject.edition.includes("通用核心") ? "通用核心" : subject.edition })));
