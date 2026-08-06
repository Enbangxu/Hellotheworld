import Link from "next/link";
import { Bot, Home, Sparkles, Users, UserRound } from "lucide-react";
import type { Locale } from "@/src/config/site";

export function MobileBottomNav({ locale }: { locale: Locale }) {
  const prefix = `/${locale}`;
  const items = [
    { label: "Home", href: prefix, icon: Home },
    { label: "AI", href: `${prefix}/assistant`, icon: Bot },
    { label: "Studio", href: "/studio", icon: Sparkles },
    { label: "Community", href: `${prefix}/community`, icon: Users },
    { label: "Profile", href: `${prefix}/dashboard`, icon: UserRound },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map(({ label, href, icon: Icon }) => (
        <Link key={label} href={href}><Icon size={20} aria-hidden="true" /><span>{label}</span></Link>
      ))}
    </nav>
  );
}
