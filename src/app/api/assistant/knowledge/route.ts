import { NextResponse } from "next/server";
import { knowledgeArticles } from "@/src/data/knowledge";
import { projects } from "@/src/data/projects";
import { creatorTools } from "@/src/data/tools";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { question?: string };
  const question = body.question?.trim() ?? "";
  const corpus = [
    ...projects.map((project) => ({ type: "Project", title: project.title, text: `${project.description} ${project.tags.join(" ")}` })),
    ...knowledgeArticles.map((article) => ({ type: "Article", title: article.title, text: `${article.summary} ${article.tags.join(" ")}` })),
    ...creatorTools.map((tool) => ({ type: "Tool", title: tool.name, text: `${tool.description} ${tool.tags.join(" ")}` })),
  ];
  const terms = question.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = corpus
    .map((item) => ({ ...item, score: terms.filter((term) => `${item.title} ${item.text}`.toLowerCase().includes(term)).length }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return NextResponse.json({ question, answer: matches.length ? "Found relevant creator network knowledge across projects, articles, and tools." : "No direct match yet. Add more projects, articles, or tools to expand the network knowledge base.", sources: matches });
}
