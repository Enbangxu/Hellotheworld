import { NextRequest, NextResponse } from "next/server";
import { matchImage } from "@/src/lib/contentImageMatcher";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AIContent = { title: string; content: string; seoDescription?: string; suggestions?: string[] };

function demoContent(prompt: string, creationType?: string): AIContent {
  const label = creationType || "exploration";
  return { title: `${label.charAt(0).toUpperCase()}${label.slice(1)}: ${prompt.slice(0, 72)}`, content: `Here is a focused starting point for “${prompt}”.\n\nDefine the outcome, gather reliable context, and turn the idea into three small actions you can complete and review. Use the creation center to develop this discovery into a polished result.`, seoDescription: `Explore ${prompt.slice(0, 120)} with an AI-guided plan.`, suggestions: ["Show me a practical example", "Create a step-by-step plan", "What should I explore next?"] };
}

function normalize(value: AIContent, prompt: string) {
  const fallback = demoContent(prompt);
  return { title: value.title || fallback.title, content: value.content || fallback.content, seoDescription: value.seoDescription || fallback.seoDescription, suggestions: Array.isArray(value.suggestions) ? value.suggestions.slice(0, 3) : fallback.suggestions, image: matchImage(`${prompt} ${value.title || ""}`) };
}

export async function POST(request: NextRequest) {
  let payload: { prompt?: unknown; type?: unknown };
  try { payload = await request.json(); } catch { return NextResponse.json({ error: { code: "INVALID_JSON", message: "A valid JSON body is required." } }, { status: 400 }); }
  const prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : "";
  const type = typeof payload.type === "string" ? payload.type.trim() : undefined;
  if (!prompt || prompt.length > 1000) return NextResponse.json({ error: { code: "INVALID_PROMPT", message: "Prompt must contain 1–1000 characters." } }, { status: 400 });

  const apiKey = process.env.AI_API_KEY;
  const endpoint = process.env.AI_API_URL;
  if (!apiKey || !endpoint) return NextResponse.json({ data: normalize(demoContent(prompt, type), prompt), meta: { provider: "demo", cached: false } });

  try {
    const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.AI_MODEL || "gpt-4o-mini", response_format: { type: "json_object" }, messages: [{ role: "system", content: "Return JSON only with title, content, seoDescription, and three suggestions. Be accurate, helpful, and concise." }, { role: "user", content: type ? `Create a ${type}: ${prompt}` : prompt }] }), signal: AbortSignal.timeout(25_000), cache: "no-store" });
    if (!response.ok) throw new Error(`Provider responded with ${response.status}`);
    const raw = await response.json();
    const text = raw.choices?.[0]?.message?.content;
    if (typeof text !== "string") throw new Error("Provider returned an invalid response");
    const content = JSON.parse(text) as AIContent;
    return NextResponse.json({ data: normalize(content, prompt), meta: { provider: "configured", cached: false } });
  } catch (error) {
    console.error("AI provider request failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: { code: "AI_UNAVAILABLE", message: "AI exploration is temporarily unavailable." } }, { status: 502 });
  }
}
