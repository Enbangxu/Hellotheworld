import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  manifest: "/manifest.json",
  icons: { icon: "/icons/app-icon.svg", apple: "/icons/app-icon.svg" },
  title: { default: "Hello the world V11 | AI Life Ecosystem", template: `%s | ${siteConfig.name}` },
  description: "Your AI Life Ecosystem for personal memory, intelligent agents, creation, community, and recommendations.",
  alternates: { canonical: "/en", languages: { en: "/en", zh: "/zh", ja: "/ja", "x-default": "/en" } },
  openGraph: { title: "Hello the world V11 — AI Life Ecosystem", description: "Memory, agents, creation, community, and recommendations in one personal AI ecosystem.", images: [{ url: "/images/og-v8.svg", width: 1200, height: 630, alt: "Hello the world V11 AI Life Ecosystem" }], type: "website", url: "/en", siteName: siteConfig.name, locale: "en_US", alternateLocale: ["zh_CN", "ja_JP"] },
  twitter: { card: "summary_large_image", title: "Hello the world V11", description: "Your personal AI Life Ecosystem.", images: ["/images/og-v8.svg"] },
  robots: { index: true, follow: true },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Hello the world V11", applicationCategory: "ProductivityApplication", operatingSystem: "Web", description: "A multilingual AI Life Ecosystem for memory, agents, creation, and community.", url: siteConfig.url };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />{children}</body></html>; }
