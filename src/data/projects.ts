export type Project = {
  id: string;
  title: string;
  description: string;
  status: "Discovery" | "Prototype" | "Building" | "Live";
  stack: string[];
  progress: number;
  links: { label: string; href: string }[];
  tags: string[];
  createdAt: string;
};

export const projects: Project[] = [
  { id: "rag-notebook", title: "RAG Notebook", description: "A retrieval workflow for turning creator notes into searchable answers and article outlines.", status: "Prototype", stack: ["Next.js", "OpenAI", "Vector DB"], progress: 45, links: [{ label: "Spec", href: "/knowledge/rag-studio-architecture" }], tags: ["rag", "knowledge", "assistant"], createdAt: "2026-07-21" },
  { id: "prompt-market", title: "Prompt Market Lab", description: "A multilingual prompt packaging experiment for creators who ship reusable AI workflows.", status: "Building", stack: ["React", "Markdown", "SEO"], progress: 68, links: [{ label: "Tools", href: "/tools" }], tags: ["prompting", "creator", "tools"], createdAt: "2026-07-16" },
  { id: "global-publisher", title: "Global Publisher", description: "A localization pipeline for publishing one idea across Chinese, English, and Japanese audiences.", status: "Live", stack: ["Next.js", "i18n", "Analytics"], progress: 100, links: [{ label: "Community", href: "/community" }], tags: ["global", "seo", "localization"], createdAt: "2026-07-10" },
  { id: "agent-dashboard", title: "Agent Dashboard", description: "A future control panel for AI assistant sessions, tool calls, memory, and human review checkpoints.", status: "Discovery", stack: ["OpenAI API", "RAG", "Postgres"], progress: 20, links: [{ label: "Assistant", href: "/assistant" }], tags: ["agent", "assistant", "workflow"], createdAt: "2026-07-05" },
];

export const projectTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();
