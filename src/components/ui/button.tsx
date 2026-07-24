import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-cyan-300 text-slate-950 shadow-[0_0_35px_rgba(103,232,249,0.45)] hover:bg-cyan-200",
  secondary: "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/20",
  ghost: "bg-transparent text-cyan-100 hover:bg-white/10",
};

export function Button({ className = "", variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return <button className={`rounded-full px-5 py-3 text-sm font-black transition ${variants[variant]} ${className}`} {...props} />;
}

export function ButtonLink({ className = "", variant = "primary", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: keyof typeof variants; children: ReactNode }) {
  return <Link className={`rounded-full px-5 py-3 text-sm font-black transition ${variants[variant]} ${className}`} {...props}>{children}</Link>;
}
