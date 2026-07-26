import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  manifest: "/manifest.json",
  icons: { icon: "/icons/app-icon.svg", apple: "/icons/app-icon.svg" },
  title: { default: "Hello the world V9 | AI Content Explorer", template: `%s | ${siteConfig.name}` },
  description: "An AI content platform for intelligent exploration, guided creation, matched visuals, and creator workflows.",
  alternates: { canonical: "/en", languages: { en: "/en", zh: "/zh", ja: "/ja", "x-default": "/en" } },
  openGraph: { title: "Hello the world V9", description: "Explore ideas and generate articles, travel plans, learning roadmaps, and product stories with AI.", images: [{ url: "/images/og-v8.svg", width: 1200, height: 630, alt: "Hello the world V9 AI Content Platform" }], type: "website", url: "/en", siteName: siteConfig.name, locale: "en_US", alternateLocale: ["zh_CN", "ja_JP"] },
  twitter: { card: "summary_large_image", title: "Hello the world V9", description: "Explore ideas and generate articles, travel plans, learning roadmaps, and product stories with AI.", images: ["/images/og-v8.svg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body className="antialiased">{children}</body></html>; }
