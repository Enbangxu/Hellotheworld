import { HomePage } from "@/src/components/HomePage";
import { getLocale } from "@/src/lib/i18n";
import { V8ImageShowcase } from "@/src/components/V8ImageShowcase";
import { AIExplorer } from "@/src/components/AIExplorer";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = getLocale(locale);
  return <><HomePage locale={activeLocale} /><div className="dark animated-gradient pt-24 text-white"><V8ImageShowcase locale={activeLocale} /><AIExplorer /></div></>;
}
