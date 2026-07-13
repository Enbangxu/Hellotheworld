"use client";

import { motion } from "framer-motion";

const blobs = [
  "left-[8%] top-[18%] h-56 w-56 bg-fuchsia-500/30",
  "right-[8%] top-[14%] h-72 w-72 bg-cyan-400/25",
  "bottom-[10%] left-[20%] h-64 w-64 bg-violet-500/25",
];

export function FloatingBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {blobs.map((className, index) => (
        <motion.div
          key={className}
          className={`absolute rounded-full blur-3xl ${className}`}
          animate={{
            x: [0, 28 - index * 10, -18, 0],
            y: [0, -22 + index * 12, 26, 0],
            scale: [1, 1.12, 0.94, 1],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
