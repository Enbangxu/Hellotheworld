import { NextResponse } from "next/server";

const allowedTypes = new Set(["page_view", "click", "user", "project", "custom"]);

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { type?: string; path?: string; target?: string };

  if (!body.type || !allowedTypes.has(body.type)) {
    return NextResponse.json({ error: "Invalid analytics event type." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, event: { type: body.type, path: body.path ?? null, target: body.target ?? null } });
}
