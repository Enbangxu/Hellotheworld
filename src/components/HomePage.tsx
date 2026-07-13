"use client";

import { useState } from "react";
import { FloatingBlobs } from "@/src/components/FloatingBlobs";
import { Hero } from "@/src/components/Hero";
import { Navbar } from "@/src/components/Navbar";
import { SectionCard } from "@/src/components/SectionCard";
import { siteContent } from "@/src/data/site";
import { getAlternateLocale } from "@/src/lib/i18n";
import type { Locale } from "@/src/config/site";

export function HomePage({ locale }: { locale: Locale }) {
  const [isDark, setIsDark] = useState(true);
  const content = siteContent[locale];
  const alternateLocale = getAlternateLocale(locale);

  return (
    <main className={`${isDark ? "dark" : ""} min-h-screen overflow-hidden`}>
      <div className="animated-gradient min-h-screen text-slate-950 transition-colors dark:text-white">
        <FloatingBlobs />
        <Navbar
          isDark={isDark}
          navItems={content.nav}
          languageHref={`/${alternateLocale}`}
          languageLabel={content.languageLabel}
          themeLabel={content.themeLabel}
          onToggleTheme={() => setIsDark((value) => !value)}
        />
        <div className="relative z-10">
          <Hero content={content.hero} />
          <div className="space-y-10 px-6 pb-24">
            {content.sections.map((section) => (
              <SectionCard key={section.id} id={section.id} title={section.title} icon={section.icon}>
                {section.body ? <p>{section.body}</p> : null}
                {section.cards ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {section.cards.map((feature) => (
                      <div key={feature} className="group rounded-2xl border border-slate-900/10 bg-white/50 p-5 font-semibold transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-cyan-500/15 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20">
                        <span className="transition group-hover:text-indigo-600 dark:group-hover:text-cyan-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </SectionCard>
            ))}
          </div>
        </div>
        <footer className="relative z-10 border-t border-slate-900/10 bg-white/35 px-6 py-8 text-center font-semibold text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-200">
          {content.footer}
        </footer>
      </div>
    </main>
  );
}
