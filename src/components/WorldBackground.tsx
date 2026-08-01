"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; radius: number; speed: number; alpha: number };

export function WorldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    let frame = 0;
    let stars: Star[] = [];
    let pointer = { x: -1000, y: -1000 };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(mobile ? 55 : 120, Math.floor(window.innerWidth * window.innerHeight / (mobile ? 12000 : 9000)));
      stars = Array.from({ length: count }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, radius: Math.random() * 1.4 + .3, speed: Math.random() * .12 + .03, alpha: Math.random() * .55 + .25 }));
    };
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const star of stars) {
        const dx = star.x - pointer.x;
        const dy = star.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (!mobile && distance < 130) { star.x += dx / Math.max(distance, 1) * .35; star.y += dy / Math.max(distance, 1) * .35; }
        if (!reduceMotion) { star.y -= star.speed; if (star.y < -3) { star.y = window.innerHeight + 3; star.x = Math.random() * window.innerWidth; } }
        context.beginPath();
        context.fillStyle = `rgba(190, 232, 255, ${star.alpha})`;
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      }
      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => { pointer = { x: event.clientX, y: event.clientY }; };
    resize(); draw();
    window.addEventListener("resize", resize, { passive: true });
    if (!mobile) window.addEventListener("pointermove", move, { passive: true });
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, []);

  return <canvas ref={canvasRef} className="v16-world-background" aria-hidden="true" />;
}
