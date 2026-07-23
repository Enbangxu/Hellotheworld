export type Agent = {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  creatorId: string;
  creatorName: string;
  creatorBio: string;
  rating: number;
  downloads: number;
  createdAt: string;
};

export const agents: Agent[] = [
  { id: "agent-strategy-copilot", name: "Strategy Copilot", description: "Turns rough startup ideas into launch plans, milestones, and risks.", category: "Strategy", prompt: "Act as a strategic AI product partner. Convert ideas into a roadmap, metrics, and experiments.", creatorId: "creator-enbang", creatorName: "Enbang", creatorBio: "AI product builder focused on multilingual creator systems.", rating: 4.9, downloads: 12840, createdAt: "2026-07-22" },
  { id: "agent-rag-architect", name: "RAG Architect", description: "Designs retrieval pipelines, source schemas, citations, and evaluation plans.", category: "Engineering", prompt: "Design a retrieval-augmented generation architecture with chunking, embeddings, evals, and guardrails.", creatorId: "creator-lina", creatorName: "Lina Chen", creatorBio: "Knowledge systems engineer and AI workflow teacher.", rating: 4.8, downloads: 9470, createdAt: "2026-07-18" },
  { id: "agent-growth-storyteller", name: "Growth Storyteller", description: "Creates social posts, launch narratives, and community prompts for AI creators.", category: "Marketing", prompt: "Create a clear launch story, audience angle, and reusable content calendar for an AI product.", creatorId: "creator-sora", creatorName: "Sora Tanaka", creatorBio: "Creator economy strategist for global AI communities.", rating: 4.7, downloads: 7312, createdAt: "2026-07-16" },
  { id: "agent-learning-mentor", name: "Learning Mentor", description: "Builds personalized learning paths with projects, checkpoints, and reflection loops.", category: "Education", prompt: "Act as a mentor. Build a weekly learning plan with projects, feedback loops, and resources.", creatorId: "creator-maya", creatorName: "Maya Park", creatorBio: "AI education designer for hands-on learning journeys.", rating: 4.6, downloads: 6205, createdAt: "2026-07-12" },
];

export const workspaceModules = [
  { title: "User projects", body: "Track idea status, owners, assets, next actions, and launch readiness." },
  { title: "Saved prompts", body: "Organize reusable prompts by project, language, category, and quality score." },
  { title: "AI conversations", body: "Pin useful chats, summarize decisions, and convert threads into tasks." },
  { title: "Knowledge files", body: "Attach briefs, research notes, datasets, and documents for future RAG workflows." },
  { title: "Share workspace", body: "Invite collaborators with read, comment, or co-build collaboration modes." },
];

export const creators = [
  { name: "Enbang", badge: "Universe Architect", ranking: 1, agents: 12, followers: "18.4K" },
  { name: "Lina Chen", badge: "RAG Mentor", ranking: 2, agents: 8, followers: "12.9K" },
  { name: "Sora Tanaka", badge: "Growth Sage", ranking: 3, agents: 7, followers: "10.1K" },
];

export const feedPosts = [
  { author: "Enbang", title: "AI Universe V6 roadmap is live", body: "Agent marketplace, workspace, feed, graph, and XP loops now share one product language.", comments: 42, likes: 680, favorites: 91 },
  { author: "Lina Chen", title: "How I evaluate RAG prompts", body: "Start from citations, answer stability, retrieval coverage, and human-review checkpoints.", comments: 18, likes: 314, favorites: 57 },
  { author: "Sora Tanaka", title: "Creator launch ritual", body: "Ship a tiny demo, publish one lesson, invite remixing, and thank the first ten users.", comments: 26, likes: 428, favorites: 73 },
];

export const levelBadges = ["Prompt Explorer", "RAG Builder", "Agent Publisher", "Community Mentor", "Universe Founder"];
