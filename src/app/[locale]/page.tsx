import { HomePage } from "@/src/components/HomePage";
import { getLocale } from "@/src/lib/i18n";
import { V8ImageShowcase } from "@/src/components/V8ImageShowcase";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = getLocale(locale);
  return <><div className="dark animated-gradient pt-24 text-white"><V8ImageShowcase locale={activeLocale} /></div><HomePage locale={activeLocale} /></>;
}
