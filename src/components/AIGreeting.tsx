"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function greetingForHour(hour: number) {
  if (hour < 5) return { greeting: "夜深了，探索者", detail: "灵感不会入睡，AI 正陪你仰望宇宙。" };
  if (hour < 12) return { greeting: "早上好，探索者", detail: "新的一天，准备发现一个全新的世界。" };
  if (hour < 18) return { greeting: "下午好，探索者", detail: "让 AI 为此刻的好奇心点亮方向。" };
  return { greeting: "晚上好，探索者", detail: "今晚，也许一个想法就能成为一颗星。" };
}

export function AIGreeting() {
  const reduceMotion = useReducedMotion();
  const [copy, setCopy] = useState({ greeting: "你好，探索者", detail: "AI 正在为你连接灵感宇宙。" });

  useEffect(() => {
    const updateGreeting = () => setCopy(greetingForHour(new Date().getHours()));
    updateGreeting();
    const timer = window.setInterval(updateGreeting, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.65 }}
      className="v16-greeting"
      aria-live="polite"
    >
      <Sparkles aria-hidden="true" size={18} />
      <span><strong>{copy.greeting}</strong><small>{copy.detail}</small></span>
    </motion.div>
  );
}
