import { redirect } from "next/navigation";
export default async function CreatorRedirect({ params }: { params: Promise<{ username: string }> }) { const { username } = await params; redirect(`/en/creator/${username}`); }
