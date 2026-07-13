import { siteConfig, type Locale } from "@/src/config/site";

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && siteConfig.locales.includes(value as Locale));
}

export function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : siteConfig.defaultLocale;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}
