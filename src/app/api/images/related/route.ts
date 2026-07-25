import { NextResponse } from "next/server";
import { getRelatedImage } from "@/src/services/imageService";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { title?: unknown; description?: unknown } | null;
  if (typeof body?.title !== "string" || typeof body.description !== "string") return NextResponse.json({ error: "title and description are required" }, { status: 400 });
  return NextResponse.json(await getRelatedImage(body.title, body.description));
}
