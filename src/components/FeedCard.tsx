"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Sparkles } from "lucide-react";

export type CommunityPost = { type: "AI Artwork" | "Prompt" | "Agent"; author: string; title: string; body: string; tags: string[]; likes: number; comments: number };

export function FeedCard({ post, index }: { post: CommunityPost; index: number }) {
  return <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl shadow-violet-950/20 backdrop-blur-xl"><div className="flex items-center justify-between"><span className="rounded-full bg-violet-300/20 px-3 py-1 text-xs font-black text-violet-100"><Sparkles className="mr-1 inline" size={14} />{post.type}</span><span className="text-sm text-slate-300">@{post.author}</span></div><h2 className="mt-4 text-2xl font-black">{post.title}</h2><p className="mt-3 leading-7 text-slate-200">{post.body}</p><div className="mt-4 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">#{tag}</span>)}</div><div className="mt-5 flex gap-3 text-sm font-black"><span><Heart className="mr-1 inline" size={17} />{post.likes}</span><span><MessageCircle className="mr-1 inline" size={17} />{post.comments}</span></div></motion.article>;
}
