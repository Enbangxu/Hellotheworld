const DEFAULT_IMAGE_URL = "/images/content-placeholder.svg";
export type ImageSource = "unsplash" | "pexels" | "fallback";
export type RelatedImage = { url: string; source: ImageSource; alt: string; title: string; tags: string[] };
type SearchResult = Pick<RelatedImage, "url" | "source">;

function buildQuery(title: string, description: string) {
  return `${title} ${description}`.replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 160);
}

export function generateImageTags(title: string, description: string): string[] {
  const ignored = new Set(["about", "after", "and", "for", "from", "into", "that", "the", "this", "with", "your"]);
  const words = buildQuery(title, description).toLowerCase().split(" ").filter((word) => word.length > 2 && !ignored.has(word));
  return [...new Set(words)].slice(0, 5).concat(["ai", "creative", "technology"]).slice(0, 5);
}

export function generateImageFallback(title: string, description = ""): RelatedImage {
  return { url: DEFAULT_IMAGE_URL, source: "fallback", alt: `${title} — ${description}`.replace(/\s+/g, " ").trim().slice(0, 180), title, tags: generateImageTags(title, description) };
}

/** Search Unsplash first, then Pexels. Missing keys and provider errors are non-fatal. */
export async function searchImage(query: string): Promise<SearchResult | null> {
  const encodedQuery = encodeURIComponent(query);
  if (process.env.UNSPLASH_ACCESS_KEY) {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodedQuery}&per_page=1&orientation=landscape`, { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }, next: { revalidate: 86400 } });
      if (response.ok) {
        const data = await response.json() as { results?: Array<{ urls?: { regular?: string } }> };
        const url = data.results?.[0]?.urls?.regular;
        if (url) return { url, source: "unsplash" };
      }
    } catch { /* Continue with the next provider. */ }
  }
  if (process.env.PEXELS_API_KEY) {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodedQuery}&per_page=1&orientation=landscape`, { headers: { Authorization: process.env.PEXELS_API_KEY }, next: { revalidate: 86400 } });
      if (response.ok) {
        const data = await response.json() as { photos?: Array<{ src?: { large?: string } }> };
        const url = data.photos?.[0]?.src?.large;
        if (url) return { url, source: "pexels" };
      }
    } catch { /* The local fallback keeps cards usable offline. */ }
  }
  return null;
}

export async function getRelatedImage(title: string, description: string): Promise<RelatedImage> {
  const fallback = generateImageFallback(title, description);
  const result = await searchImage(buildQuery(title, description));
  return result ? { ...fallback, ...result } : fallback;
}
