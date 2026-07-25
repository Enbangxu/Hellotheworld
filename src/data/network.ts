import { knowledgeArticles } from "@/src/data/knowledge";
import { projects } from "@/src/data/projects";
import { creatorTools } from "@/src/data/tools";

export type NetworkCreator = {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  socialLinks: { label: string; href: string }[];
  projectIds: string[];
  articleSlugs: string[];
  toolNames: string[];
};

export type MarketplaceProduct = {
  name: string;
  description: string;
  price: string;
  creator: string;
  category: "AI Tool" | "Prompt" | "Template";
  url: string;
  tags: string[];
};

export const creators: NetworkCreator[] = [
  {
    username: "enbang",
    displayName: "Enbang",
    avatarUrl: "https://api.dicebear.com/9.x/shapes/svg?seed=enbang",
    bio: "Founder of Hello the World and AI Creator Network builder focused on multilingual AI products, RAG workflows, and creator operating systems.",
    skills: ["AI Strategy", "Next.js", "RAG", "Prompt Systems", "Global Publishing"],
    socialLinks: [
      { label: "Website", href: "https://enbang.online" },
      { label: "GitHub", href: "https://github.com/Enbangxu" },
    ],
    projectIds: ["rag-notebook", "prompt-market", "global-publisher"],
    articleSlugs: ["ai-studio-architecture", "rag-studio-architecture"],
    toolNames: ["Idea Compass", "RAG Brief Builder", "Launch Checklist"],
  },
  {
    username: "studio-agent",
    displayName: "Studio Agent",
    avatarUrl: "https://api.dicebear.com/9.x/shapes/svg?seed=studio-agent",
    bio: "AI co-builder for turning experiments into shippable creator assets, dashboards, and market-ready templates.",
    skills: ["Automation", "Analytics", "Content Ops", "Tool Curation"],
    socialLinks: [{ label: "Assistant", href: "/en/assistant" }],
    projectIds: ["agent-dashboard"],
    articleSlugs: ["rag-studio-architecture"],
    toolNames: ["Community Pulse", "Script Studio"],
  },
];

export const marketplaceProducts: MarketplaceProduct[] = [
  { name: "RAG Brief Builder", description: "A grounded brief workflow for turning source notes into assistant-ready answers.", price: "$29", creator: "enbang", category: "AI Tool", url: "https://enbang.online/tools/rag-brief-builder", tags: ["rag", "knowledge"] },
  { name: "Creator Launch Prompt Pack", description: "Reusable prompts for positioning, landing pages, newsletters, and short-form launch scripts.", price: "$19", creator: "enbang", category: "Prompt", url: "https://enbang.online/marketplace/creator-launch-prompt-pack", tags: ["prompt", "launch"] },
  { name: "AI Product OS Template", description: "A template for tracking creator products, experiments, feedback, and analytics rituals.", price: "$49", creator: "studio-agent", category: "Template", url: "https://enbang.online/marketplace/ai-product-os-template", tags: ["template", "dashboard"] },
];

export const networkStats = {
  pageViews: "18.4K",
  clicks: "3.2K",
  users: creators.length.toString(),
  projects: projects.length.toString(),
};

export function getCreator(username: string) {
  return creators.find((creator) => creator.username === username);
}

export function getCreatorContent(username: string) {
  const creator = getCreator(username);
  if (!creator) return null;

  return {
    creator,
    projects: projects.filter((project) => creator.projectIds.includes(project.id)),
    articles: knowledgeArticles.filter((article) => creator.articleSlugs.includes(article.slug)),
    tools: creatorTools.filter((tool) => creator.toolNames.includes(tool.name)),
  };
}

export type NetworkAgent = {
  name: string;
  description: string;
  category: string;
  creator: string;
  rating: number;
};

export const agents: NetworkAgent[] = [
  { name: "Launch Copilot", description: "Plans launch stories, landing pages, and distribution checklists.", category: "Marketing", creator: "enbang", rating: 4.9 },
  { name: "RAG Architect", description: "Designs grounded retrieval workflows for creator knowledge bases.", category: "Knowledge", creator: "enbang", rating: 4.8 },
  { name: "Community Pulse", description: "Summarizes feed trends, comments, and collaboration opportunities.", category: "Community", creator: "studio-agent", rating: 4.7 },
];
