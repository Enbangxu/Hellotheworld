import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemPageShell } from "@/src/components/ecosystem/EcosystemPageShell";
import { siteConfig, type Locale } from "@/src/config/site";
import { getAlternateLocale, getLocale } from "@/src/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const title = locale === "zh" ? "Global Creator | 全球创作者增长" : "Global Creator | Multilingual Creator Growth";
  const description = locale === "zh" ? "面向全球受众的中英文创作者增长、SEO 与 hreflang 页面。" : "Chinese and English creator growth with SEO metadata and hreflang support.";
  return { title, description, alternates: { canonical: `/${locale}/global`, languages: { en: "/en/global", zh: "/zh/global" } }, openGraph: { title, description, url: `/${locale}/global`, siteName: siteConfig.name, type: "website", locale: locale === "en" ? "en_US" : "zh_CN", alternateLocale: [locale === "en" ? "zh_CN" : "en_US"] } };
}

export default async function GlobalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = getLocale(rawLocale);
  const alternateLocale = getAlternateLocale(locale);
  const copy = locale === "zh"
    ? { eyebrow: "Global Creator", title: "全球创作者入口", subtitle: "中英文切换、SEO metadata 与 hreflang 已就绪，帮助内容触达全球受众。", switchLabel: "Switch to English", cards: ["双语内容结构", "区域化 SEO", "跨平台发布节奏"] }
    : { eyebrow: "Global Creator", title: "Global Creator Hub", subtitle: "Chinese/English switching, SEO metadata, and hreflang-ready pages for creators reaching worldwide audiences.", switchLabel: "切换到中文", cards: ["Bilingual content structure", "Localized SEO", "Cross-platform publishing rhythm"] };

  return (
    <EcosystemPageShell locale={locale} eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle}>
      <Link href={`/${alternateLocale}/global`} className="inline-flex rounded-full bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:scale-105">{copy.switchLabel}</Link>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{copy.cards.map((card) => <div key={card} className="rounded-3xl border border-white/15 bg-white/10 p-6 text-xl font-black backdrop-blur-xl">{card}</div>)}</div>
    </EcosystemPageShell>
  );
}
