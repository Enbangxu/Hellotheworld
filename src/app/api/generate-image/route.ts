import { NextResponse } from "next/server";
import {
  enhancePrompt,
  GeminiRequestError,
  googleAspectRatios,
  isImageSize,
  isImageStyle,
} from "@/src/lib/image-generation";
import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 300;

const WINDOW_MS = 60_000;
const LIMIT = 5;
const requests = new Map<string, { count: number; expiresAt: number }>();

type GeminiImageResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }> } }>;
};

function isRateLimited(request: Request) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const now = Date.now();
  const entry = requests.get(address);
  if (!entry || entry.expiresAt <= now) {
    requests.set(address, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "请求过于频繁，请一分钟后再试。" }, { status: 429 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 240_000);

  try {
    const body = (await request.json()) as { prompt?: unknown; style?: unknown; size?: unknown };
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt || prompt.length > 1500 || !isImageStyle(body.style) || !isImageSize(body.size)) {
      return NextResponse.json({ error: "请提供有效的描述、风格和图片尺寸。" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini 图片服务尚未配置，请联系管理员。" }, { status: 503 });
    }

    const enhancedPrompt = await enhancePrompt(prompt, body.style, body.size, apiKey, controller.signal);
    const model = process.env.GOOGLE_AI_IMAGE_MODEL || "gemini-2.5-flash-image";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: enhancedPrompt }] }],
          generationConfig: {
            responseModalities: ["IMAGE"],
            imageConfig: { aspectRatio: googleAspectRatios[body.size] },
          },
        }),
      },
    );

    if (!response.ok) throw new GeminiRequestError("Image generation failed", response.status);
    const result = (await response.json()) as GeminiImageResponse;
    const image = result.candidates?.[0]?.content?.parts?.find((part) => part.inlineData?.data)?.inlineData;
    if (!image?.data) throw new GeminiRequestError("Image generation returned no image", 502);

    const imageUrl = `data:${image.mimeType || "image/png"};base64,${image.data}`;
    await prisma.generationTask.create({
      data: { prompt, enhancedPrompt, style: body.style, size: body.size, imageUrl, provider: "gemini" },
    });
    return NextResponse.json({ imageUrl });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    const providerStatus = error instanceof GeminiRequestError ? error.status : 0;
    const rateLimited = providerStatus === 429;
    console.error("Gemini image request failed", { timedOut, providerStatus });
    return NextResponse.json(
      { error: timedOut ? "生成超时了，请稍后重试。" : rateLimited ? "Gemini 服务繁忙，请稍后重试。" : "图片生成暂时不可用，请稍后再试。" },
      { status: timedOut ? 504 : rateLimited ? 429 : 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
