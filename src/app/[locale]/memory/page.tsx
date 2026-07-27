import type { Metadata } from "next";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { MemoryVault } from "@/src/components/v10/MemoryVault";
import { getLocale } from "@/src/lib/i18n";
export const metadata: Metadata = { title: "AI Memory Vault", description: "User-controlled, vector-ready personal memory architecture for RAG and AI assistance." };
export default async function MemoryPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: raw } = await params; const locale = getLocale(raw); return <EcosystemPageShell locale={locale} eyebrow="Personal intelligence" title="Memory that works for you." subtitle="Capture useful context, find it with semantic retrieval, and ground your personal AI in what matters."><MemoryVault /></EcosystemPageShell>; }
