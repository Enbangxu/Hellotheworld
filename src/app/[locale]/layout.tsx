import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, type Locale } from "@/src/config/site";
import { siteContent } from "@/src/data/site";
import { getOgLocale, isLocale } from "@/src/lib/i18n";

export function generateStaticParams() { return siteConfig.locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale: rawLocale } = await params; if (!isLocale(rawLocale)) return {}; const locale: Locale = rawLocale; const content = siteContent[locale]; const languages = { en: "/en", zh: "/zh", ja: "/ja", "x-default": "/en" }; return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: `/${locale}`, languages }, openGraph: { title: content.metadata.ogTitle, description: content.metadata.description, url: `/${locale}`, type: "website", siteName: siteConfig.name, locale: getOgLocale(locale), alternateLocale: siteConfig.locales.filter((item) => item !== locale).map(getOgLocale) }, twitter: { card: "summary_large_image", title: content.metadata.ogTitle, description: content.metadata.description } }; }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return children; }
