import { NextRequest, NextResponse } from "next/server";
import { recommendationCatalog } from "@/src/data/v10";

type Behavior = { viewed?: string[]; saved?: string[]; interests?: string[] };

function personalize(behavior: Behavior) {
  const signals = [...(behavior.viewed ?? []), ...(behavior.saved ?? []), ...(behavior.interests ?? [])].map((value) => value.toLowerCase());
  return recommendationCatalog.map((item) => {
    const matches = item.tags.filter((tag) => signals.some((signal) => signal.includes(tag) || tag.includes(signal))).length;
    return { ...item, score: Math.min(0.99, item.score + matches * 0.02), reason: matches ? `Matched ${matches} of your recent interest signals` : item.reason };
  }).sort((a, b) => b.score - a.score);
}

export async function GET(request: NextRequest) {
  const interests = request.nextUrl.searchParams.get("interests")?.split(",").filter(Boolean) ?? [];
  return NextResponse.json({ recommendations: personalize({ interests }), strategy: "behavior + content-vector-ready matching", generatedAt: new Date().toISOString() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { behavior?: Behavior; limit?: number };
  const limit = Math.max(1, Math.min(body.limit ?? 10, 20));
  return NextResponse.json({ recommendations: personalize(body.behavior ?? {}).slice(0, limit), strategy: "behavior + content-vector-ready matching", generatedAt: new Date().toISOString() });
}
