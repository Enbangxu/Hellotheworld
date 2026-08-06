import Link from "next/link";
import { BookOpen, Compass, Sparkles } from "lucide-react";
import type { Locale } from "@/src/config/site";

type Intent = {
  label: string;
  href: string;
  icon: typeof BookOpen;
};

const copy: Record<Locale, { greeting: string; prompt: string; intents: Intent[] }> = {
  zh: {
    greeting: "你好，我是 Hello AI",
    prompt: "你今天想：",
    intents: [
      { label: "学习", href: "/zh/knowledge", icon: BookOpen },
      { label: "创造", href: "/create", icon: Sparkles },
      { label: "探索", href: "/zh/assistant", icon: Compass },
    ],
  },
  en: {
    greeting: "Hi, I’m Hello AI",
    prompt: "What would you like to do today?",
    intents: [
      { label: "Learn", href: "/en/knowledge", icon: BookOpen },
      { label: "Create", href: "/create", icon: Sparkles },
      { label: "Explore", href: "/en/assistant", icon: Compass },
    ],
  },
  ja: {
    greeting: "こんにちは、Hello AI です",
    prompt: "今日は何をしますか？",
    intents: [
      { label: "学ぶ", href: "/ja/knowledge", icon: BookOpen },
      { label: "創る", href: "/create", icon: Sparkles },
      { label: "探索する", href: "/ja/assistant", icon: Compass },
    ],
  },
};

export function AIEntry({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <section className="minimal-panel mx-auto w-full max-w-3xl p-5 sm:p-7" aria-labelledby="ai-entry-title">
      <div className="text-center">
        <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300 text-slate-950"><Sparkles size={21} aria-hidden="true" /></span>
        <h2 id="ai-entry-title" className="mt-4 text-xl font-bold text-white sm:text-2xl">{content.greeting}</h2>
        <p className="mt-1 text-sm text-slate-400">{content.prompt}</p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        {content.intents.map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} className="minimal-intent">
            <Icon size={19} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
