export type CreatorTool = {
  name: string;
  category: string;
  description: string;
  url: string;
  rating: number;
  tags: string[];
};

export const creatorTools: CreatorTool[] = [
  { name: "Idea Compass", category: "Research", description: "Collects audience signals and turns them into ranked content angles.", url: "https://enbang.online/tools/idea-compass", rating: 4.8, tags: ["research", "ideas", "strategy"] },
  { name: "Script Studio", category: "Production", description: "Drafts short-form video scripts with hooks, scenes, and retention notes.", url: "https://enbang.online/tools/script-studio", rating: 4.7, tags: ["video", "writing", "workflow"] },
  { name: "Launch Checklist", category: "Operations", description: "A repeatable checklist for publishing multilingual campaigns without missing SEO basics.", url: "https://enbang.online/tools/launch-checklist", rating: 4.5, tags: ["seo", "ops", "global"] },
  { name: "Community Pulse", category: "Analytics", description: "Summarizes comments, questions, and recurring audience needs into next actions.", url: "https://enbang.online/tools/community-pulse", rating: 4.6, tags: ["analytics", "community", "insights"] },
  { name: "RAG Brief Builder", category: "Knowledge", description: "Transforms source notes into grounded briefs ready for assistant responses.", url: "https://enbang.online/tools/rag-brief-builder", rating: 4.9, tags: ["rag", "knowledge", "assistant"] },
];

export const toolCategories = Array.from(new Set(creatorTools.map((tool) => tool.category))).sort();
export const toolTags = Array.from(new Set(creatorTools.flatMap((tool) => tool.tags))).sort();
