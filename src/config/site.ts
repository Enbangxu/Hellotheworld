export const siteConfig = {
  name: "Hello the World AI Creator Network",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://enbang.online",
  defaultLocale: "en",
  locales: ["en", "zh", "ja"],
} as const;

export type Locale = (typeof siteConfig.locales)[number];
