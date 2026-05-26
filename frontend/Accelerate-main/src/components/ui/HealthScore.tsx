"use client";

import { motion } from "framer-motion";

export function HealthScore({ score }: { score: number }) {
  const color = score >= 85 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-32 h-32 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} 0deg ${score * 3.6}deg, #e2e8f0 ${score * 3.6}deg 360deg)`,
        }}
      >
        <div className="absolute inset-2 rounded-full bg-[var(--card)] flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold"
            style={{ color }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-[var(--muted)]">Health Score</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-center text-[var(--muted)] max-w-[200px]">
        Composite index across finance, operations, quality & patient experience
      </p>
    </div>
  );
}
