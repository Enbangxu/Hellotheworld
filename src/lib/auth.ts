import { cookies } from "next/headers";

export type AuthSession = { user: { name: string; email?: string; image?: string } } | null;

export async function getSession(): Promise<AuthSession> {
  const cookieStore = await cookies();
  const value = cookieStore.get("enbang_v5_session")?.value;
  if (!value) return null;
  return { user: { name: value } };
}
