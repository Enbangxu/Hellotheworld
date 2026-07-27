export type RecommendationItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  score: number;
  reason: string;
};

export const recommendationCatalog: RecommendationItem[] = [
  { id: "rag-memory", title: "Build a memory-aware RAG companion", summary: "Connect durable memories to grounded retrieval and make every conversation more useful.", category: "Knowledge", tags: ["rag", "memory", "agents"], score: 0.96, reason: "Matches your knowledge-building activity" },
  { id: "agent-launch", title: "Launch your first personal agent", summary: "Turn a repeatable workflow into a shareable agent for the creator marketplace.", category: "Agents", tags: ["agents", "creator", "launch"], score: 0.92, reason: "Recommended from your recent creations" },
  { id: "ai-world-brief", title: "Your daily AI world brief", summary: "A focused view of agentic systems, multimodal creation, and the tools shaping AI work.", category: "Trend", tags: ["news", "trends", "ai"], score: 0.89, reason: "Popular in topics you follow" },
  { id: "creative-os", title: "Design a creative operating system", summary: "Combine ideas, projects, memory, and publishing into one calm personal workflow.", category: "Workflow", tags: ["productivity", "creator", "memory"], score: 0.86, reason: "Complements your saved workflows" },
];

export const memorySeeds = [
  { type: "Preference", content: "Prefers concise, visual launch plans with clear next actions.", date: "Today, 09:42" },
  { type: "Project", content: "Building a multilingual AI creator toolkit with Next.js.", date: "Yesterday" },
  { type: "Insight", content: "RAG answers should link every important claim to its source.", date: "Jul 24" },
];

export const dailyFeed = [
  { kind: "AI news", title: "Personal agents move from chat to coordinated workflows", summary: "The next generation of assistants is learning to plan, use tools, and preserve context across sessions.", time: "8 min read", tags: ["Agents", "Workflows"] },
  { kind: "Trend radar", title: "Small, focused models become the new product primitive", summary: "Creators are pairing specialized models with retrieval and strong interfaces instead of relying on one model for everything.", time: "5 min read", tags: ["Models", "Product"] },
  { kind: "For you", title: "A practical memory architecture for personal AI", summary: "Separate episodic events, durable preferences, and knowledge chunks to improve retrieval quality and user control.", time: "7 min read", tags: ["Memory", "RAG"] },
];
