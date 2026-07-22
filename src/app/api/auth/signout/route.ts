import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(new URL("/en/dashboard", url.origin));
  response.cookies.delete("enbang_v5_session");
  return response;
}
