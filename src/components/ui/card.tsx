import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-2xl font-black text-white ${className}`} {...props} />;
}
