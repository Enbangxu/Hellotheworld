import { NextResponse } from "next/server";
import { enhancePrompt, googleAspectRatios, isImageSize, isImageStyle, type ImageSize, type ImageStyle } from "@/src/lib/image-generation";
import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 300;

type GeminiPart = { text?: string; inlineData?: { data?: string; mimeType?: string } };
type GeminiResponse = { candidates?: Array<{ content?: { parts?: GeminiPart[] } }> };

async function callGemini(model: string, apiKey: string, body: object, signal: AbortSignal) {
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify(body),
  });
}

async function optimizePrompt(prompt: string, style: ImageStyle, size: ImageSize, apiKey: string, signal: AbortSignal) {
  const source = enhancePrompt(prompt, style, size);
  const response = await callGemini(process.env.GOOGLE_AI_TEXT_MODEL || "gemini-2.5-flash", apiKey, {
    contents: [{ parts: [{ text: `You optimize prompts for an image generator. Expand the user's idea with a coherent subject, setting, lighting, composition, and high-quality visual details. Keep the original meaning and every explicit constraint. Do not add explanations, labels, quotation marks, or policy commentary. Return only the optimized prompt in the user's language.\n\n${source}` }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
  }, signal);
  if (!response.ok) {
    console.error("Gemini prompt optimization failed", { status: response.status });
    throw new Error(response.status === 429 ? "RATE_LIMITED" : "PROMPT_OPTIMIZATION_FAILED");
  }
  const result = await response.json() as GeminiResponse;
  const optimized = result.candidates?.[0]?.content?.parts?.map(part => part.text || "").join("").trim();
  if (!optimized) throw new Error("PROMPT_OPTIMIZATION_FAILED");
  return optimized;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { prompt?: unknown; style?: unknown; size?: unknown };
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt || prompt.length > 1500 || !isImageStyle(body.style) || !isImageSize(body.size)) {
      return NextResponse.json({ error: "请提供有效的描述、风格和图片尺寸。" }, { status: 400 });
    }
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "图片生成服务尚未配置，请联系管理员。" }, { status: 503 });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120_000);
    try {
      const optimizedPrompt = await optimizePrompt(prompt, body.style, body.size, apiKey, controller.signal);
      const response = await callGemini(process.env.GOOGLE_AI_IMAGE_MODEL || "gemini-2.5-flash-image", apiKey, {
        contents: [{ parts: [{ text: optimizedPrompt }] }],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: googleAspectRatios[body.size] } },
      }, controller.signal);
      if (!response.ok) {
        console.error("Gemini image generation failed", { status: response.status });
        return NextResponse.json({ error: "这次生成没有成功，请调整描述后重试。" }, { status: response.status === 429 ? 429 : 502 });
      }
      const result = await response.json() as GeminiResponse;
      const image = result.candidates?.[0]?.content?.parts?.find(part => part.inlineData?.data)?.inlineData;
      if (!image?.data) throw new Error("IMAGE_PROVIDER_RETURNED_NO_IMAGE");
      const imageUrl = `data:${image.mimeType || "image/png"};base64,${image.data}`;
      await prisma.generationTask.create({ data: { prompt, style: body.style, size: body.size, imageUrl } });
      return NextResponse.json({ imageUrl });
    } finally { clearTimeout(timer); }
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    const rateLimited = error instanceof Error && error.message === "RATE_LIMITED";
    const errorCode = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    console.error("Image generation route error", { timedOut, rateLimited, errorCode });
    return NextResponse.json({ error: timedOut ? "生成超时了，请稍后重试。" : rateLimited ? "生成请求较多，请稍后再试。" : "服务暂时不可用，请稍后再试。" }, { status: timedOut ? 504 : rateLimited ? 429 : 500 });
  }
}
