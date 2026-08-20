import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

export const STUDIO_SESSION_COOKIE = "htw_studio_session";
export const STUDIO_SESSION_MAX_AGE = 60 * 60 * 24 * 365;

export function newStudioSessionId() {
  return randomUUID();
}

export async function readStudioSession() {
  return (await cookies()).get(STUDIO_SESSION_COOKIE)?.value || null;
}

export function studioSessionCookie(value: string) {
  return { name: STUDIO_SESSION_COOKIE, value, options: { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: STUDIO_SESSION_MAX_AGE } };
}
