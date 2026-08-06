import { HomePage } from "@/src/components/HomePage";
import { getLocale } from "@/src/lib/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePage locale={getLocale(locale)} />;
}
