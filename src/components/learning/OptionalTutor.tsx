"use client";
import { useState } from "react";
import type { Locale } from "@/src/config/site";
import { TutorPanel } from "./TutorPanel";

const label = { zh: "还是没看懂？问 AI", en: "Still unclear? Ask AI", ja: "まだ分からない？AIに聞く" };
export function OptionalTutor({ topicId, locale }: { topicId: string; locale: Locale }) {
  const [open, setOpen] = useState(false);
  return <section className="mt-6">
    <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="text-sm text-slate-400 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
      {label[locale]}
    </button>
    {open && <div className="mt-4"><TutorPanel topicId={topicId} locale={locale} /></div>}
  </section>;
}
