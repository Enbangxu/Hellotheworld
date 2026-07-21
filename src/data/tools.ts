export type CreatorTool = {
  name: string;
  category: string;
  description: string;
  url: string;
  tags: string[];
};

export const creatorTools: CreatorTool[] = [
  { name: "Idea Compass", category: "Research", description: "Collects audience signals and turns them into ranked content angles.", url: "https://enbang.online/tools/idea-compass", tags: ["research", "ideas", "strategy"] },
  { name: "Script Studio", category: "Production", description: "Drafts short-form video scripts with hooks, scenes, and retention notes.", url: "https://enbang.online/tools/script-studio", tags: ["video", "writing", "workflow"] },
  { name: "Launch Checklist", category: "Operations", description: "A repeatable checklist for publishing multilingual campaigns without missing SEO basics.", url: "https://enbang.online/tools/launch-checklist", tags: ["seo", "ops", "global"] },
  { name: "Community Pulse", category: "Analytics", description: "Summarizes comments, questions, and recurring audience needs into next actions.", url: "https://enbang.online/tools/community-pulse", tags: ["analytics", "community", "insights"] },
];

export const toolCategories = Array.from(new Set(creatorTools.map((tool) => tool.category)));
export const toolTags = Array.from(new Set(creatorTools.flatMap((tool) => tool.tags)));
