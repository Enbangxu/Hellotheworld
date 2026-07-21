export type KnowledgeArticle = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  date: string;
};

export const knowledgeArticles: KnowledgeArticle[] = [
  { slug: "ai-studio-architecture", title: "AI Studio Architecture", summary: "The v4 module map for lab projects, tools, assistant UI, knowledge, and creator network loops.", date: "2026-07-21", tags: ["architecture", "studio", "v4"], content: `# AI Studio Architecture\n\nEnbang AI Studio v4 is organized around five loops: discover projects in the lab, select tools, ask the assistant, publish knowledge, and grow through the creator network.\n\n## Future integrations\n\n- OpenAI API for chat and structured generation.\n- RAG pipelines for grounded answers.\n- Vector databases for semantic retrieval.\n- Human review checkpoints for quality.` },
  { slug: "rag-studio-architecture", title: "RAG Studio Notes", summary: "A markdown brief describing how retrieval-augmented generation will connect with the assistant.", date: "2026-07-20", tags: ["rag", "assistant", "knowledge"], content: `# RAG Studio Notes\n\nThe assistant shell should remain UI-first until backend secrets and indexes are ready. Source documents can later be chunked, embedded, stored, retrieved, and cited inside chat responses.` },
];
