import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === siteConfig.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(siteConfig.locales.map((item) => [item, `${siteConfig.url}/${item}`])),
    },
  }));
}
