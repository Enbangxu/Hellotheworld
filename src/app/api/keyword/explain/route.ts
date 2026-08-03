import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { generateExplanation } from "@/src/lib/keywords";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let payload: { word?: unknown; category?: unknown };
  try { payload = await request.json(); }
  catch { return NextResponse.json({ error: { code: "INVALID_JSON", message: "请求格式不正确。" } }, { status: 400 }); }
  const word = typeof payload.word === "string" ? payload.word.trim() : "";
  const category = typeof payload.category === "string" ? payload.category.trim().slice(0, 50) : "general";
  if (!word || word.length > 80) return NextResponse.json({ error: { code: "INVALID_KEYWORD", message: "关键词长度应为 1–80 个字符。" } }, { status: 400 });

  try {
    try {
      const cached = await prisma.keywordExplanation.findUnique({ where: { word } });
      if (cached) return NextResponse.json({ data: { word: cached.word, explanation: cached.explanation, useCases: cached.useCases, relatedKeywords: cached.relatedKeywords }, meta: { source: "database" } });
    } catch (databaseError) { console.warn("Keyword database lookup failed; using DeepSeek", databaseError instanceof Error ? databaseError.message : "Unknown error"); }

    const data = await generateExplanation(word, category);
    try {
      await prisma.keywordExplanation.upsert({ where: { word }, update: { category, explanation: data.explanation, useCases: data.useCases, relatedKeywords: data.relatedKeywords }, create: { word, category, explanation: data.explanation, useCases: data.useCases, relatedKeywords: data.relatedKeywords } });
    } catch (databaseError) { console.warn("Keyword explanation could not be cached", databaseError instanceof Error ? databaseError.message : "Unknown error"); }
    return NextResponse.json({ data, meta: { source: "deepseek" } });
  } catch (error) {
    console.error("Keyword explanation failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: { code: "EXPLANATION_UNAVAILABLE", message: "知识卡片暂时不可用，请稍后再试。" } }, { status: 502 });
  }
}
