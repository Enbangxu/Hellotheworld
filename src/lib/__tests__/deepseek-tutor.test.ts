import { afterEach, describe, expect, it, vi } from "vitest";
import { askDeepSeek, TutorError } from "@/src/lib/deepseek-tutor";
import { allTopics } from "@/src/lib/grade9-curriculum";

const input = { locale: "zh" as const, topicId: "x", mode: "ask" as const };
const topic = allTopics()[0].topic;
const completion = (content: string | null) => new Response(JSON.stringify({ choices: [{ message: { content } }] }), { status: 200 });
const valid = JSON.stringify({ answer: "结论", example: "例子" });

afterEach(() => { delete process.env.DEEPSEEK_API_KEY; delete process.env.DEEPSEEK_BASE_URL; delete process.env.DEEPSEEK_MODEL; vi.restoreAllMocks(); });

describe("DeepSeek grade 9 tutor", () => {
  it("fails safely without a server key", async () => {
    await expect(askDeepSeek(input, topic)).rejects.toMatchObject({ code: "UPSTREAM_UNAVAILABLE", status: 503 });
  });

  it("uses the compatible endpoint, server authorization, defaults, JSON mode and non-thinking mode", async () => {
    process.env.DEEPSEEK_API_KEY = "server-test-key";
    const fetcher = vi.fn().mockResolvedValue(completion(valid));
    const result = await askDeepSeek(input, topic, fetcher);
    expect(result).toMatchObject({ answer: "结论", provider: "deepseek", model: "deepseek-v4-flash" });
    const [url, request] = fetcher.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.deepseek.com/chat/completions");
    expect(request.headers).toMatchObject({ Authorization: "Bearer server-test-key" });
    const body = JSON.parse(String(request.body));
    expect(body).toMatchObject({ model: "deepseek-v4-flash", thinking: { type: "disabled" }, response_format: { type: "json_object" }, max_tokens: 700, stream: false });
    expect(body.messages[0].content).toContain("只输出JSON对象");
    expect(body.messages[0].content).not.toContain('"steps"');
    const userPayload = JSON.parse(body.messages.at(-1).content);
    expect(userPayload.context).toMatchObject({
      plainMeaning: expect.any(String),
      concreteExample: expect.any(String),
      memoryAnchor: topic.instantLesson.memoryAnchor.zh,
    });
  });

  it("parses Markdown JSON fences", async () => {
    process.env.DEEPSEEK_API_KEY = "test";
    await expect(askDeepSeek(input, topic, vi.fn().mockResolvedValue(completion(`\`\`\`json\n${valid}\n\`\`\``)))).resolves.toMatchObject({ answer: "结论" });
  });

  it.each([[null], ["not json"], [JSON.stringify({ example: "missing answer" })]])("returns INVALID_OUTPUT for empty or invalid output", async (content) => {
    process.env.DEEPSEEK_API_KEY = "test";
    await expect(askDeepSeek(input, topic, vi.fn().mockResolvedValue(completion(content)))).rejects.toMatchObject({ code: "INVALID_OUTPUT", status: 502 });
  });

  it.each([[401, "UPSTREAM_AUTH", 503], [403, "UPSTREAM_AUTH", 503], [429, "UPSTREAM_RATE_LIMIT", 429], [500, "UPSTREAM_UNAVAILABLE", 503]])("classifies HTTP %i", async (status, code, mappedStatus) => {
    process.env.DEEPSEEK_API_KEY = "test";
    await expect(askDeepSeek(input, topic, vi.fn().mockResolvedValue(new Response("private upstream error", { status })))).rejects.toMatchObject({ code, status: mappedStatus });
  });

  it("classifies aborts as timeouts", async () => {
    process.env.DEEPSEEK_API_KEY = "test";
    const aborted = Object.assign(new Error("aborted"), { name: "AbortError" });
    await expect(askDeepSeek(input, topic, vi.fn().mockRejectedValue(aborted))).rejects.toMatchObject({ code: "UPSTREAM_TIMEOUT", status: 504 });
  });

  it("never calls the real network in tests", () => {
    expect(TutorError).toBeDefined();
  });
});
