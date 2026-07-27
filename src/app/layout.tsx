import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  manifest: "/manifest.json",
  icons: { icon: "/icons/app-icon.svg", apple: "/icons/app-icon.svg" },
  title: { default: "Hello the world V10 | AI Personal World OS", template: `%s | ${siteConfig.name}` },
  description: "Your AI Personal World OS for memory, creation, agents, knowledge, and a feed personalized to you.",
  alternates: { canonical: "/en", languages: { en: "/en", zh: "/zh", ja: "/ja", "x-default": "/en" } },
  openGraph: { title: "Hello the world V10", description: "A personal AI world where memory, creation, agents, and knowledge work together.", images: [{ url: "/images/og-v8.svg", width: 1200, height: 630, alt: "Hello the world V10 AI Personal World OS" }], type: "website", url: "/en", siteName: siteConfig.name, locale: "en_US", alternateLocale: ["zh_CN", "ja_JP"] },
  twitter: { card: "summary_large_image", title: "Hello the world V10", description: "Your AI Personal World OS for memory, creation, agents, and knowledge.", images: ["/images/og-v8.svg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body className="antialiased">{children}</body></html>; }
