"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#features" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-slate-900/10 bg-white/75 px-5 py-3 text-slate-900 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl transition dark:border-white/15 dark:bg-slate-950/55 dark:text-white">
        <a href="#home" className="text-lg font-black tracking-tight">
          Hello the World
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white dark:text-slate-200 dark:hover:bg-white dark:hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full border border-slate-900/10 bg-white/80 p-2 text-slate-900 transition hover:scale-105 hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="rounded-full border border-slate-900/10 bg-white/80 p-2 text-slate-900 md:hidden dark:border-white/15 dark:bg-white/10 dark:text-white"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="mx-auto mt-3 grid max-w-6xl gap-2 rounded-3xl border border-slate-900/10 bg-white/90 p-4 text-slate-900 shadow-2xl backdrop-blur-2xl md:hidden dark:border-white/15 dark:bg-slate-950/85 dark:text-white">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-3 font-semibold transition hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </motion.header>
  );
}
