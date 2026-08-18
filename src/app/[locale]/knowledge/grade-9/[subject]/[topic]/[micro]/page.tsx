import { notFound, permanentRedirect } from "next/navigation";
import { getSubject, getTopicBySlug } from "@/src/lib/grade9-curriculum";
import { getLocale } from "@/src/lib/i18n";

export default async function LegacyMicroLessonPage({ params }: { params: Promise<{ locale: string; subject: string; topic: string; micro: string }> }) {
  const values = await params;
  const locale = getLocale(values.locale);
  const subject = getSubject(values.subject);
  const topic = getTopicBySlug(values.subject, values.topic);
  if (!subject || !topic) notFound();
  permanentRedirect(`/${locale}/knowledge/grade-9/${subject.slug}/${topic.slug}`);
}
