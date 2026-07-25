import type { Metadata } from "next";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { V7Shell } from "@/src/components/V7Shell";
import { Card } from "@/src/components/ui/card";
export const metadata: Metadata = { title: "Login | AI Creator Network", description: "Sign in to the V7 creator network with OAuth-ready authentication." };
export default function LoginPage() { return <V7Shell eyebrow="NextAuth ready" title="Login to your creator cockpit" subtitle="OAuth, email, avatar, and creator profile flows are structured for NextAuth and PostgreSQL."><Card className="mx-auto max-w-xl"><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-300 text-slate-950"><Github size={36} /></div><h2 className="mt-5 text-3xl font-black">Welcome back</h2><p className="mt-3 text-slate-200">Connect a GitHub identity or continue with email when providers are enabled in Vercel environment variables.</p><div className="mt-6 grid gap-3"><Link href="/api/auth/signin" className="rounded-2xl bg-cyan-300 px-5 py-4 text-center font-black text-slate-950">Continue with GitHub</Link><Link href="/register" className="rounded-2xl bg-white/10 px-5 py-4 text-center font-black text-white"><Mail className="mr-2 inline" size={18} />Create account</Link></div></Card></V7Shell>; }
