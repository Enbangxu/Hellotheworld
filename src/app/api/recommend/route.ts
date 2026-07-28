import { NextRequest, NextResponse } from "next/server";
import { recommendationCatalog } from "@/src/data/v10";
import { createRecommendations } from "@/src/lib/recommendation";
import type { UserMemory } from "@/src/lib/memory";

type Behavior = { viewed?: string[]; saved?: string[]; interests?: string[] };

function personalize(memory: Partial<UserMemory>, behavior: Behavior) {
  return createRecommendations({ ...memory, interests: [...(memory.interests ?? []), ...(behavior.interests ?? [])] }, behavior, recommendationCatalog);
}

export async function GET(request: NextRequest) {
  const interests = request.nextUrl.searchParams.get("interests")?.split(",").filter(Boolean) ?? [];
  return NextResponse.json({ recommendations: personalize({ interests }, {}), strategy: "memory + behavior + content matching", generatedAt: new Date().toISOString() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { memory?: Partial<UserMemory>; behavior?: Behavior; limit?: number };
  const limit = Math.max(1, Math.min(body.limit ?? 10, 20));
  return NextResponse.json({ recommendations: personalize(body.memory ?? {}, body.behavior ?? {}).slice(0, limit), strategy: "memory + behavior + content matching", generatedAt: new Date().toISOString() });
}
