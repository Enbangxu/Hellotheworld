export type ExploreIcon = "compass" | "sparkles" | "brain" | "users" | "orbit" | "layers";

export interface ExploreItem {
  title: string;
  description: string;
  icon: ExploreIcon;
  route: string;
  accent: string;
}

export const v12Content = {
  hero: {
    eyebrow: "Hello the world",
    lines: ["Explore.", "Create.", "Imagine."],
    description: "Step into an intelligent world where ideas become experiences, creativity meets AI, and every possibility is yours to explore.",
    primaryCta: "Explore the AI world",
    secondaryCta: "Start creating",
  },
  explore: {
    eyebrow: "Your world, expanded",
    title: "Choose where curiosity takes you.",
    description: "One connected gateway to everything already inside Hello the world.",
    items: [
      { title: "Discover", description: "Find ideas, stories, and signals selected for an endlessly curious mind.", icon: "compass", route: "/feed", accent: "from-cyan-400 to-blue-500" },
      { title: "Create", description: "Turn a spark into writing, visuals, and intelligent experiences with AI.", icon: "sparkles", route: "/create", accent: "from-fuchsia-500 to-violet-600" },
      { title: "Remember", description: "Build a private, living memory that keeps your context close at hand.", icon: "brain", route: "/memory", accent: "from-violet-500 to-indigo-600" },
      { title: "Connect", description: "Meet creators, exchange perspectives, and grow with a global community.", icon: "users", route: "/community", accent: "from-orange-400 to-pink-500" },
      { title: "AI Agents", description: "Explore specialized collaborators ready to research, plan, and make with you.", icon: "orbit", route: "/agents", accent: "from-emerald-400 to-cyan-500" },
      { title: "Your Space", description: "Bring projects, tools, memories, and daily momentum into one personal place.", icon: "layers", route: "/workspace", accent: "from-blue-500 to-violet-600" },
    ] satisfies ExploreItem[],
  },
} as const;
