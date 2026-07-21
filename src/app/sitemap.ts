import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";

const routes = ["", "/lab", "/tools", "/global"];

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.locales.flatMap((locale) => routes.map((route) => ({
    url: `${siteConfig.url}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" && locale === siteConfig.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(siteConfig.locales.map((item) => [item, `${siteConfig.url}/${item}${route}`])),
    },
  })));
}
