import { NextResponse } from "next/server";
import { enhancePrompt, isImageSize, isImageStyle, openAiSizes } from "@/src/lib/image-generation";
import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { prompt?: unknown; style?: unknown; size?: unknown };
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt || prompt.length > 1500 || !isImageStyle(body.style) || !isImageSize(body.size)) {
      return NextResponse.json({ error: "请提供有效的描述、风格和图片尺寸。" }, { status: 400 });
    }
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "图片生成服务尚未配置，请联系管理员。" }, { status: 503 });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120_000);
    let response: Response;
    try {
      response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST", signal: controller.signal,
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: process.env.OPENAI_IMAGE_MODEL || "dall-e-3", prompt: enhancePrompt(prompt, body.style, body.size), size: openAiSizes[body.size], quality: "standard", n: 1, response_format: "url" }),
      });
    } finally { clearTimeout(timer); }
    if (!response.ok) {
      const detail = await response.text();
      console.error("OpenAI image generation failed", response.status, detail.slice(0, 500));
      return NextResponse.json({ error: "这次生成没有成功，请调整描述后重试。" }, { status: response.status === 429 ? 429 : 502 });
    }
    const result = await response.json() as { data?: Array<{ url?: string; b64_json?: string }> };
    const first = result.data?.[0];
    const imageUrl = first?.url || (first?.b64_json ? `data:image/png;base64,${first.b64_json}` : "");
    if (!imageUrl) throw new Error("Image provider returned no image");
    await prisma.generationTask.create({ data: { prompt, style: body.style, size: body.size, imageUrl } });
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Image generation route error", error);
    const timedOut = error instanceof Error && error.name === "AbortError";
    return NextResponse.json({ error: timedOut ? "生成超时了，请稍后重试。" : "服务暂时不可用，请稍后再试。" }, { status: timedOut ? 504 : 500 });
  }
}
