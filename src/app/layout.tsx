import type { Metadata } from "next";
import "@/src/styles/globals.css";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Hello the World | Production Ready Next.js Website",
    template: `%s | ${siteConfig.name}`,
  },
  description: "A bilingual, SEO-ready Next.js website foundation with polished motion, clean architecture, and production deployment workflows.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      zh: "/zh",
    },
  },
  openGraph: {
    title: "Hello the World — Production Ready Website",
    description: "A bilingual, SEO-ready Next.js website foundation with polished motion and a clean architecture.",
    type: "website",
    url: "/en",
    siteName: siteConfig.name,
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello the World — Production Ready Website",
    description: "A bilingual, SEO-ready Next.js website foundation with polished motion and a clean architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
