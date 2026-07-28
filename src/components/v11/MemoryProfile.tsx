"use client";

import { useState } from "react";
import { saveMemory, updatePreference, type UserMemory } from "@/src/lib/memory";

const seed: UserMemory = { userId: "demo-creator", interests: ["AI agents", "RAG", "multilingual products"], behavior: { viewed: ["memory architecture"], saved: ["agent workflow"], created: ["launch roadmap"] }, history: [{ action: "created", subject: "AI launch roadmap", timestamp: "2026-07-28T09:42:00.000Z" }] };

export function MemoryProfile() {
  const [memory, setMemory] = useState<UserMemory>(() => saveMemory(seed));
  const addPreference = () => setMemory(updatePreference(memory.userId, ["community creativity"]));
  return <section className="mb-6 rounded-3xl border border-cyan-200/20 bg-slate-950/40 p-6 backdrop-blur-2xl"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-200">Memory 2.0 profile</p><h2 className="mt-2 text-2xl font-black">{memory.userId}</h2></div><button type="button" onClick={addPreference} className="rounded-full bg-cyan-300 px-5 py-3 font-black text-slate-950">Update preference</button></div><div className="mt-6 grid gap-4 md:grid-cols-3"><div><p className="font-black">Interests</p><p className="mt-2 text-slate-200">{memory.interests.join(" · ")}</p></div><div><p className="font-black">Behavior</p><p className="mt-2 text-slate-200">{memory.behavior.viewed.length} viewed · {memory.behavior.saved.length} saved · {memory.behavior.created.length} created</p></div><div><p className="font-black">History</p><p className="mt-2 text-slate-200">{memory.history.length} durable event{memory.history.length === 1 ? "" : "s"}</p></div></div></section>;
}
