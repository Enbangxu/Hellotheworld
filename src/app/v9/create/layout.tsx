import { generateJsonLd, generateMetadata } from "@/src/lib/seo";

const seo = { title: "AI Creation Center", description: "Generate articles, travel plans, learning roadmaps, product introductions, SEO descriptions, and matched images with AI.", path: "/v9/create", image: "/images/og-v8.svg" };
export const metadata = generateMetadata(seo);

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(seo)).replace(/</g, "\\u003c") }} /></>;
}
