import { Mail, Map, Rocket } from "lucide-react";
import { FloatingBlobs } from "@/components/FloatingBlobs";
import { Hero } from "@/components/Hero";
import { SectionCard } from "@/components/SectionCard";

export default function Home() {
  return (
    <main className="animated-gradient min-h-screen overflow-hidden">
      <FloatingBlobs />
      <div className="relative z-10">
        <Hero />
        <div className="space-y-10 px-6 pb-24">
          <SectionCard id="about" title="About" icon={Rocket}>
            <p>
              Hello the world is a polished first step onto the web: fast, accessible, and designed to feel welcoming from the very first glance.
            </p>
          </SectionCard>
          <SectionCard id="journey" title="Journey" icon={Map}>
            <p>
              Every great project starts with curiosity. This page celebrates the beginning of a creative journey through modern tools, thoughtful motion, and responsive design.
            </p>
          </SectionCard>
          <SectionCard id="contact" title="Contact" icon={Mail}>
            <p>
              Ready to connect? Use this section as a launchpad for email, social links, or a future contact form as the website continues to grow.
            </p>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
