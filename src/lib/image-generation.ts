export const IMAGE_STYLES = [
  "realistic",
  "anime",
  "3d",
  "watercolor",
  "cyberpunk",
  "fantasy",
  "cinematic",
] as const;

export const IMAGE_SIZES = ["1:1", "16:9", "9:16"] as const;

export type ImageStyle = (typeof IMAGE_STYLES)[number];
export type ImageSize = (typeof IMAGE_SIZES)[number];

export const stylePrompts: Record<ImageStyle, string> = {
  realistic: "photorealistic, natural light, true-to-life textures, professional photography",
  anime: "polished anime illustration, expressive composition, clean line art",
  "3d": "premium 3D render, cinematic lighting, physically based detailed materials",
  watercolor: "delicate watercolor painting, organic pigment texture, artistic brushwork",
  cyberpunk: "cyberpunk visual style, neon atmosphere, cinematic futuristic detail",
  fantasy: "epic fantasy art, magical atmosphere, intricate world-building, rich detail",
  cinematic: "cinematic composition, dramatic lighting, filmic color grading, high detail",
};

export const googleAspectRatios: Record<ImageSize, ImageSize> = {
  "1:1": "1:1",
  "16:9": "16:9",
  "9:16": "9:16",
};

type GeminiTextResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
};

export function isImageStyle(value: unknown): value is ImageStyle {
  return typeof value === "string" && IMAGE_STYLES.includes(value as ImageStyle);
}

export function isImageSize(value: unknown): value is ImageSize {
  return typeof value === "string" && IMAGE_SIZES.includes(value as ImageSize);
}

export async function enhancePrompt(
  prompt: string,
  style: ImageStyle,
  size: ImageSize,
  apiKey: string,
  signal: AbortSignal,
) {
  const model = process.env.GOOGLE_AI_TEXT_MODEL || "gemini-2.5-flash";
  const instruction = `Rewrite the user's image idea as one concise, production-ready English image prompt. Preserve every subject and intention. Add useful composition, lighting, texture, and camera details. Do not explain your work and do not add headings. Visual direction: ${stylePrompts[style]}. Aspect ratio: ${size}. User idea: ${prompt}`;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: instruction }] }] }),
    },
  );

  if (!response.ok) throw new GeminiRequestError("Prompt enhancement failed", response.status);
  const result = (await response.json()) as GeminiTextResponse;
  const enhanced = result.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join(" ").trim();
  if (!enhanced) throw new GeminiRequestError("Prompt enhancement returned no text", 502);
  return enhanced;
}

export class GeminiRequestError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "GeminiRequestError";
  }
}
