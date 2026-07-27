import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { PersonalSpace } from "@/src/components/v10/PersonalSpace";
import { getLocale } from "@/src/lib/i18n";
export const metadata: Metadata = { title: "Personal AI Space", description: "Your private AI command center for creations, knowledge, activity, and recommendations." };
export default async function SpacePage({ params }: { params: Promise<{ locale: string }> }) { const { locale: raw } = await params; const locale = getLocale(raw); return <EcosystemPageShell locale={locale} eyebrow="V10 · Personal world" title="Your AI space, alive with context." subtitle="Think with an assistant that understands your creations, knowledge, activity, and ambitions."><PersonalSpace locale={locale} /></EcosystemPageShell>; }
