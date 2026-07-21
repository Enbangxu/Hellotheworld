import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { projects } from "@/src/data/projects";
const routes = ["", "/lab", "/tools", "/assistant", "/community", "/knowledge", "/changelog", "/global"];
export default function sitemap(): MetadataRoute.Sitemap { const projectRoutes = projects.map((project) => `/lab/${project.id}`); return siteConfig.locales.flatMap((locale) => [...routes, ...projectRoutes].map((route) => ({ url: `${siteConfig.url}/${locale}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" && locale === siteConfig.defaultLocale ? 1 : 0.8, alternates: { languages: Object.fromEntries([...siteConfig.locales.map((item) => [item, `${siteConfig.url}/${item}${route}`]), ["x-default", `${siteConfig.url}/en${route}`]]) } }))); }
