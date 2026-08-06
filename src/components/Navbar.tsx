import Link from "next/link";
import { Languages } from "lucide-react";
import { siteConfig, type Locale } from "@/src/config/site";

const languageNames: Record<Locale, string> = { zh: "中文", en: "EN", ja: "日本語" };

export function Navbar({ locale }: { locale: Locale }) {
  const prefix = `/${locale}`;
  const navItems = [
    { label: "AI", href: `${prefix}/assistant` },
    { label: "Studio", href: "/studio" },
    { label: "Community", href: `${prefix}/community` },
    { label: "Profile", href: `${prefix}/dashboard` },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Primary navigation">
        <Link href={prefix} className="font-black tracking-tight text-white">Hello the World</Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => <Link key={item.label} href={item.href} className="minimal-nav-link">{item.label}</Link>)}
        </div>
        <div className="flex items-center gap-1" aria-label="Language selector">
          <Languages className="mr-1 text-slate-400" size={17} aria-hidden="true" />
          {siteConfig.locales.map((item) => (
            <Link key={item} href={`/${item}`} hrefLang={item} aria-current={item === locale ? "page" : undefined} className={item === locale ? "minimal-language minimal-language-active" : "minimal-language"}>{languageNames[item]}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
