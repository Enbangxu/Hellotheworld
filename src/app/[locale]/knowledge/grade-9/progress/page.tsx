import type { Metadata } from "next";
import { getLocale } from "@/src/lib/i18n";
import { Breadcrumbs } from "@/src/components/learning/Breadcrumbs";
import { ProgressDashboard } from "@/src/components/learning/ProgressDashboard";
export const metadata: Metadata = { title: "V23 学习进度", description: "本地保存的九年级七科学习掌握度与智能复习计划。" };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const locale = getLocale((await params).locale); return <main className="min-h-screen bg-slate-950 px-5 py-12 text-white"><div className="mx-auto max-w-6xl"><Breadcrumbs items={[{ label: "学习中心", href: `/${locale}/knowledge/grade-9` }, { label: "学习进度" }]}/><ProgressDashboard locale={locale}/></div></main>; }
