export type ImageMatch = {
  keyword: string;
  imageUrl: string;
  alt: string;
};

const imageCatalog = [
  { keywords: ["travel", "trip", "旅行", "旅程", "city"], keyword: "travel", imageUrl: "/images/ai-travel.svg", alt: "AI-generated travel planning landscape" },
  { keywords: ["learn", "study", "学习", "课程", "roadmap"], keyword: "learning", imageUrl: "/images/ai-learning.svg", alt: "AI learning roadmap illustration" },
  { keywords: ["product", "launch", "产品", "品牌", "marketing"], keyword: "product", imageUrl: "/images/ai-product.svg", alt: "AI product launch illustration" },
  { keywords: ["article", "write", "文章", "内容", "story"], keyword: "writing", imageUrl: "/images/ai-writing.svg", alt: "AI-assisted writing workspace" },
] as const;

const fallback: ImageMatch = { keyword: "exploration", imageUrl: "/images/content-placeholder.svg", alt: "Abstract AI exploration artwork" };

export function matchImage(content: string): ImageMatch {
  const normalized = content.trim().toLocaleLowerCase();
  const match = imageCatalog.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
  return match ? { keyword: match.keyword, imageUrl: match.imageUrl, alt: match.alt } : fallback;
}
