export const IMAGE_STYLES = ["realistic", "anime", "3d", "watercolor", "cyberpunk"] as const;
export const IMAGE_SIZES = ["1:1", "16:9", "9:16"] as const;
export type ImageStyle = typeof IMAGE_STYLES[number];
export type ImageSize = typeof IMAGE_SIZES[number];

const stylePrompts: Record<ImageStyle, string> = {
  realistic: "photorealistic, natural light, true-to-life textures and detail",
  anime: "polished anime illustration, expressive composition, clean line art",
  "3d": "premium 3D render, cinematic lighting, detailed materials",
  watercolor: "delicate watercolor painting, organic pigment texture, artistic brushwork",
  cyberpunk: "cyberpunk visual style, neon atmosphere, cinematic futuristic detail",
};

export const openAiSizes: Record<ImageSize, string> = { "1:1": "1024x1024", "16:9": "1792x1024", "9:16": "1024x1792" };

export function isImageStyle(value: unknown): value is ImageStyle { return typeof value === "string" && IMAGE_STYLES.includes(value as ImageStyle); }
export function isImageSize(value: unknown): value is ImageSize { return typeof value === "string" && IMAGE_SIZES.includes(value as ImageSize); }
export function enhancePrompt(prompt: string, style: ImageStyle, size: ImageSize) {
  return `${prompt.trim()}\n\nVisual direction: ${stylePrompts[style]}. Composition: ${size} aspect ratio. Preserve the user's subjects, intent, relationships, and requested details exactly; do not introduce conflicting elements.`;
}
