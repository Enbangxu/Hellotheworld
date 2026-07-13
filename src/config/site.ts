export const siteConfig = {
  name: "Hello the World",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hellotheworld.vercel.app",
  defaultLocale: "en",
  locales: ["en", "zh"],
} as const;

export type Locale = (typeof siteConfig.locales)[number];
