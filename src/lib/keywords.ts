export type Keyword = {
  word: string;
  importance: "high" | "medium" | "low";
  category: string;
};

export type KeywordExplanation = {
  word: string;
  explanation: string;
  useCases: string[];
  relatedKeywords: string[];
};

type Completion = { choices?: Array<{ message?: { content?: string } }> };

function jsonFromContent(content: string): unknown {
  const cleaned = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  return JSON.parse(cleaned);
}

export function normalizeKeywords(value: unknown): Keyword[] {
  const items = Array.isArray(value) ? value : (value as { keywords?: unknown })?.keywords;
  if (!Array.isArray(items)) return [];
  const seen = new Set<string>();
  return items.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const source = item as Record<string, unknown>;
    const word = typeof source.word === "string" ? source.word.trim().slice(0, 80) : "";
    const key = word.toLocaleLowerCase();
    if (!word || seen.has(key)) return [];
    seen.add(key);
    const importance = ["high", "medium", "low"].includes(String(source.importance))
      ? source.importance as Keyword["importance"] : "medium";
    const category = typeof source.category === "string" && source.category.trim()
      ? source.category.trim().slice(0, 50) : "general";
    return [{ word, importance, category }];
  }).slice(0, 8);
}

export function normalizeExplanation(value: unknown, word: string): KeywordExplanation | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const explanation = typeof source.explanation === "string" ? source.explanation.trim().slice(0, 1000) : "";
  if (!explanation) return null;
  const strings = (candidate: unknown, limit: number) => Array.isArray(candidate)
    ? candidate.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map((item) => item.trim().slice(0, 100)).slice(0, limit)
    : [];
  return { word, explanation, useCases: strings(source.useCases, 5), relatedKeywords: strings(source.relatedKeywords, 8) };
}

async function deepSeekJSON(system: string, prompt: string, maxTokens: number): Promise<unknown> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DeepSeek is not configured");
  const base = (process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com").replace(/\/$/, "");
  const response = await fetch(`${base}/chat/completions`, {
    method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    cache: "no-store", signal: AbortSignal.timeout(20_000),
    body: JSON.stringify({ model: process.env.DEEPSEEK_MODEL || "deepseek-chat", response_format: { type: "json_object" }, max_tokens: maxTokens, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }),
  });
  if (!response.ok) throw new Error(`DeepSeek responded with ${response.status}`);
  const content = ((await response.json()) as Completion).choices?.[0]?.message?.content;
  if (!content) throw new Error("DeepSeek returned an empty response");
  return jsonFromContent(content);
}

export async function analyzeKeywords(answer: string): Promise<Keyword[]> {
  const value = await deepSeekJSON(
    "你是关键词分析器。根据回答提取3至8个用户最可能想继续了解的具体关键词。只返回JSON：{\"keywords\":[{\"word\":\"\",\"importance\":\"high|medium|low\",\"category\":\"\"}]}。关键词语言须与回答一致，不要返回句子。",
    answer.slice(0, 8000), 700,
  );
  return normalizeKeywords(value);
}

export async function generateExplanation(word: string, category?: string): Promise<KeywordExplanation> {
  const value = await deepSeekJSON(
    "你是知识卡片编辑。用用户关键词的语言简洁、准确地解释概念。只返回JSON：{\"explanation\":\"\",\"useCases\":[\"\"],\"relatedKeywords\":[\"\"]}。提供2至4个应用场景和3至6个相关关键词，不确定时明确说明。",
    `关键词：${word}\n类别：${category || "未指定"}`, 900,
  );
  const normalized = normalizeExplanation(value, word);
  if (!normalized) throw new Error("DeepSeek returned an invalid explanation");
  return normalized;
}
