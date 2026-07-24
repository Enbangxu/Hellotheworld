import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: { default: "Hello the world V7 | AI Creator Network", template: `%s | ${siteConfig.name}` },
  description: "An AI Creator Network platform for profiles, agents, projects, marketplace discovery, community feeds, and creator analytics.",
  alternates: { canonical: "/en", languages: { en: "/en", zh: "/zh", ja: "/ja", "x-default": "/en" } },
  openGraph: { title: "Hello the world V7", description: "Build and publish AI agents, projects, creator profiles, and marketplace products.", type: "website", url: "/en", siteName: siteConfig.name, locale: "en_US", alternateLocale: ["zh_CN", "ja_JP"] },
  twitter: { card: "summary_large_image", title: "Hello the world V7", description: "Build and publish AI agents, projects, creator profiles, and marketplace products." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body className="antialiased">{children}</body></html>; }
