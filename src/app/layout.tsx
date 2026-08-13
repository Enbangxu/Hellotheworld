import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  manifest: "/manifest.json",
  icons: { icon: "/icons/app-icon.svg", apple: "/icons/app-icon.svg" },
  title: { default: "Hello the World V23 - Adaptive Learning", template: `%s | ${siteConfig.name}` },
  description: "Create the future with AI through a focused assistant, studio, and global community.",
  keywords: ["Hello the world", "AI 助手", "DeepSeek", "人工智能", "世界探索", "AI 推荐", "创意社区"],
  alternates: { canonical: "/en", languages: { en: "/en", zh: "/zh", ja: "/ja", "x-default": "/en" } },
  openGraph: { title: "Hello the World V23 - Adaptive Learning", description: "Create the future with AI through a focused assistant, studio, and global community.", images: [{ url: "/images/og-v14.svg", width: 1200, height: 630, alt: "Hello The World AI Creative Universe" }], type: "website", url: "/en", siteName: siteConfig.name, locale: "en_US", alternateLocale: ["zh_CN", "ja_JP"] },
  twitter: { card: "summary_large_image", title: "Hello the World V23 — Adaptive Learning", description: "Talk. Discover. Explore with AI.", images: ["/images/og-v14.svg"] },
  robots: { index: true, follow: true },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Hello the World V23", applicationCategory: "ProductivityApplication", operatingSystem: "Web", description: "A multilingual AI interactive world for personal recommendations, exploration, creation, memory, agents, and community.", url: siteConfig.url, featureList: ["DeepSeek AI welcome assistant", "Personalized AI recommendations", "World exploration", "Community interactions"] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />{children}</body></html>; }
