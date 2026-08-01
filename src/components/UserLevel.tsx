"use client";

import { Compass } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "hello-world-explorer";

type ExplorerState = { visits: number; lastVisit: string };

function levelFromVisits(visits: number) {
  const level = Math.min(9, Math.max(1, Math.ceil(visits / 3)));
  const names = ["New Explorer", "Curious Voyager", "World Seeker", "Star Navigator", "AI Pioneer", "Universe Builder", "Cosmic Creator", "Vision Keeper", "Infinite Explorer"];
  return { level, name: names[level - 1] };
}

export function UserLevel() {
  const [explorer, setExplorer] = useState({ level: 1, name: "New Explorer" });

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null") as ExplorerState | null;
      const visits = Math.max(1, (saved?.visits || 0) + (saved?.lastVisit === today ? 0 : 1));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ visits, lastVisit: today } satisfies ExplorerState));
      setExplorer(levelFromVisits(visits));
    } catch {
      setExplorer(levelFromVisits(1));
    }
  }, []);

  return <div className="v16-level" title="你的探索等级保存在此设备中"><Compass aria-hidden="true" size={17} /><span>Lv.{explorer.level} {explorer.name}</span></div>;
}
