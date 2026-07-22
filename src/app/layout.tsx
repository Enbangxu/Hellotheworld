import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: { default: "Enbang AI Creator Network v5 | Build ideas with AI", template: `%s | ${siteConfig.name}` },
  description: "A multilingual AI Creator Network for lab projects, tools, assistant workflows, creator networks, and knowledge publishing.",
  alternates: { canonical: "/en", languages: { en: "/en", zh: "/zh", ja: "/ja", "x-default": "/en" } },
  openGraph: { title: "Enbang AI Creator Network v5", description: "Build ideas with AI through labs, tools, assistant workflows, knowledge, and creator networks.", type: "website", url: "/en", siteName: siteConfig.name, locale: "en_US", alternateLocale: ["zh_CN", "ja_JP"] },
  twitter: { card: "summary_large_image", title: "Enbang AI Creator Network v5", description: "Build ideas with AI through labs, tools, assistant workflows, knowledge, and creator networks." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body className="antialiased">{children}</body></html>; }
