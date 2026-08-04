import { NextRequest, NextResponse } from "next/server";
import { generateExplanation } from "@/src/lib/keywords";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const levels = ["simple", "expert", "business"] as const;
type Level = typeof levels[number];

export async function POST(request: NextRequest) {
  let body: { keyword?: unknown; level?: unknown };
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: { message: "请求格式不正确。" } }, { status: 400 }); }
  const keyword = typeof body.keyword === "string" ? body.keyword.trim() : "";
  const level = typeof body.level === "string" && levels.includes(body.level as Level) ? body.level as Level : null;
  if (!keyword || keyword.length > 80 || !level) return NextResponse.json({ error: { message: "keyword（1–80 字符）和有效 level 为必填项。" } }, { status: 400 });
  try {
    const style = level === "simple" ? "通俗入门" : level === "expert" ? "专家技术" : "商业决策";
    const result = await generateExplanation(`${keyword}（请使用${style}视角）`, level);
    return NextResponse.json({ data: { title: keyword, summary: result.explanation, relatedKeywords: result.relatedKeywords, level } });
  } catch (error) {
    console.error("V18 explanation failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: { message: "DeepSeek 解释暂时不可用，请稍后再试。" } }, { status: 502 });
  }
}
