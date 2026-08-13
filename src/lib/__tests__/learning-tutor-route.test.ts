import { afterEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/src/app/api/learning/tutor/route";
import { allTopics } from "@/src/lib/grade9-curriculum";

afterEach(() => { delete process.env.DEEPSEEK_API_KEY; });

describe("DeepSeek learning tutor route", () => {
  it("returns 400 for invalid input", async () => {
    const response = await POST(new NextRequest("http://localhost/api/learning/tutor", { method: "POST", body: JSON.stringify({ locale: "invalid" }), headers: { "content-type": "application/json" } }));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: { code: "INVALID_INPUT" } });
  });

  it("returns a stable 503 without a DeepSeek key while static data remains available", async () => {
    const topic = allTopics()[0].topic;
    expect(topic.tenSecondSummary.zh).toBeTruthy();
    const response = await POST(new NextRequest("http://localhost/api/learning/tutor", { method: "POST", body: JSON.stringify({ locale: "zh", topicId: topic.id, mode: "ask" }), headers: { "content-type": "application/json", "x-forwarded-for": "route-test" } }));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ error: { code: "UPSTREAM_UNAVAILABLE" } });
  });
});
