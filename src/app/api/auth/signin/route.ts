import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.AUTH_GITHUB_ID;
  const baseUrl = process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!clientId) {
    const response = NextResponse.redirect(new URL("/en/dashboard?auth=demo", baseUrl));
    response.cookies.set("enbang_v5_session", "demo-github-creator", { httpOnly: true, sameSite: "lax", path: "/" });
    return response;
  }

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", "read:user user:email");
  url.searchParams.set("redirect_uri", `${baseUrl}/api/auth/callback/github`);
  return NextResponse.redirect(url);
}
