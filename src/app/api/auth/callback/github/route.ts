import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const response = NextResponse.redirect(new URL("/en/dashboard", url.origin));
  response.cookies.set("enbang_v5_session", code ? "github-creator" : "demo-github-creator", { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}
