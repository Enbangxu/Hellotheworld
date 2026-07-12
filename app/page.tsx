"use client";

import { Mail, Rocket, Sparkles } from "lucide-react";
import { useState } from "react";
import { FloatingBlobs } from "@/components/FloatingBlobs";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SectionCard } from "@/components/SectionCard";

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  return (
    <main className={`${isDark ? "dark" : ""} min-h-screen overflow-hidden`}>
      <div className="animated-gradient min-h-screen text-slate-950 transition-colors dark:text-white">
        <FloatingBlobs />
        <Navbar isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)} />
        <div className="relative z-10">
          <Hero />
          <div className="space-y-10 px-6 pb-24">
            <SectionCard id="about" title="About" icon={Rocket}>
              <p>
                Hello the World is a modern landing page for curious builders, travelers, and dreamers. It pairs polished motion with a welcoming voice so every visitor feels invited to explore.
              </p>
            </SectionCard>

            <SectionCard id="features" title="Features" icon={Sparkles}>
              <div className="grid gap-4 md:grid-cols-3">
                {["Animated gradients", "Responsive layouts", "Dark mode ready"].map((feature) => (
                  <div key={feature} className="rounded-2xl border border-slate-900/10 bg-white/50 p-5 font-semibold dark:border-white/10 dark:bg-white/10">
                    {feature}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard id="contact" title="Contact" icon={Mail}>
              <p>
                Ready to connect? Use this section as a launchpad for email, social links, or a future contact form as the website continues to grow.
              </p>
            </SectionCard>
          </div>
        </div>
        <footer className="relative z-10 border-t border-slate-900/10 bg-white/35 px-6 py-8 text-center font-semibold text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-200">
          © 2026 Hello the World
        </footer>
      </div>
    </main>
  );
}
