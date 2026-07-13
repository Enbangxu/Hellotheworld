import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, type Locale } from "@/src/config/site";
import { siteContent } from "@/src/data/site";
import { isLocale } from "@/src/lib/i18n";

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};

  const locale: Locale = rawLocale;
  const content = siteContent[locale];
  const path = `/${locale}`;

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
    openGraph: {
      title: content.metadata.ogTitle,
      description: content.metadata.description,
      url: path,
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "en" ? "en_US" : "zh_CN",
      alternateLocale: [locale === "en" ? "zh_CN" : "en_US"],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.ogTitle,
      description: content.metadata.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return children;
}
