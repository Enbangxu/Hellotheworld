import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";

type SEOInput = { title: string; description: string; path?: string; image?: string; locale?: string };

export function generateMetadata({ title, description, path = "/", image = "/images/og-v8.svg", locale = "en_US" }: SEOInput): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, siteName: siteConfig.name, locale, type: "website", images: [{ url: image, width: 1200, height: 630, alt: title }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export function generateJsonLd({ title, description, path = "/", image = "/images/og-v8.svg" }: SEOInput) {
  return { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: new URL(path, siteConfig.url).toString(), image: new URL(image, siteConfig.url).toString(), isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url } };
}
