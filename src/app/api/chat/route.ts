import { NextRequest, NextResponse } from "next/server";
import { matchImage } from "@/src/lib/imageMatcher";
import { analyzeAIResponse, analyzeKeywords, type Keyword } from "@/src/lib/keywords";

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
  let payload: { prompt?: unknown; message?: unknown; type?: unknown };
  try { payload = await request.json(); } catch { return NextResponse.json({ error: { code: "INVALID_JSON", message: "A valid JSON body is required." } }, { status: 400 }); }
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (message) {
    if (message.length > 1000) return NextResponse.json({ error: { code: "INVALID_MESSAGE", message: "消息不能超过 1000 个字符。" } }, { status: 400 });
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) return NextResponse.json({ error: { code: "CONFIGURATION_REQUIRED", message: "AI 助手正在配置中，请稍后再试。" } }, { status: 503 });
    try {
      const base = (process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com").replace(/\/$/, "");
      const response = await fetch(`${base}/chat/completions`, { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, cache: "no-store", signal: AbortSignal.timeout(25_000), body: JSON.stringify({ model: process.env.DEEPSEEK_MODEL || "deepseek-chat", max_tokens: 700, messages: [{ role: "system", content: "你是 Hello the world V16 AI Creative Universe 的欢迎助手。请用用户使用的语言简洁、友好地回答，帮助用户探索世界、知识与创意；不要虚构事实。" }, { role: "user", content: message }] }) });
      if (!response.ok) throw new Error(`DeepSeek responded with ${response.status}`);
      const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
      const reply = result.choices?.[0]?.message?.content?.trim();
      if (!reply) throw new Error("DeepSeek returned an empty response");
      let keywords: Keyword[] = [];
      let suggestedQuestions: string[] = [];
      try {
        const analysis = await analyzeAIResponse(reply);
        keywords = analysis.keywords;
        suggestedQuestions = analysis.suggestedQuestions;
      }
      catch (keywordError) { console.warn("DeepSeek keyword analysis failed", keywordError instanceof Error ? keywordError.message : "Unknown error"); }
      if (!keywords.length) {
        try { keywords = await analyzeKeywords(reply); } catch {}
      }
      return NextResponse.json({ answer: reply, keywords, suggestedQuestions, reply });
    } catch (error) {
      console.error("DeepSeek chat request failed", error instanceof Error ? error.message : "Unknown error");
      return NextResponse.json({ error: { code: "AI_UNAVAILABLE", message: "AI 助手暂时不可用，请稍后再试。" } }, { status: 502 });
    }
  }
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
