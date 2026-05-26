"use client";

import { motion } from "framer-motion";

interface FlowLink {
  source: string;
  target: string;
  value: number;
}

const sourceColors: Record<string, string> = {
  OPD: "#0ea5e9",
  IPD: "#8b5cf6",
  Emergency: "#ef4444",
};

const targetColors: Record<string, string> = {
  Diagnostics: "#10b981",
  Pharmacy: "#f59e0b",
  IPD: "#8b5cf6",
  Surgery: "#ec4899",
  ICU: "#ef4444",
};

export function SankeyFlow({ data }: { data: FlowLink[] }) {
  const sources = [...new Set(data.map((d) => d.source))];
  const targets = [...new Set(data.map((d) => d.target))];
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3">
      {data.map((link, i) => {
        const width = Math.max(20, (link.value / maxVal) * 100);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2"
          >
            <span
              className="text-xs font-medium w-20 text-right shrink-0 px-2 py-1 rounded"
              style={{ backgroundColor: `${sourceColors[link.source]}20`, color: sourceColors[link.source] }}
            >
              {link.source}
            </span>
            <div className="flex-1 relative h-6 flex items-center">
              <div
                className="h-2 rounded-full opacity-80"
                style={{
                  width: `${width}%`,
                  background: `linear-gradient(90deg, ${sourceColors[link.source]}, ${targetColors[link.target]})`,
                }}
              />
              <span className="absolute right-0 text-xs text-[var(--muted)]">{link.value}</span>
            </div>
            <span
              className="text-xs font-medium w-24 shrink-0 px-2 py-1 rounded"
              style={{ backgroundColor: `${targetColors[link.target]}20`, color: targetColors[link.target] }}
            >
              {link.target}
            </span>
          </motion.div>
        );
      })}
      <div className="flex justify-between text-xs text-[var(--muted)] pt-2 border-t border-slate-200 dark:border-slate-700">
        <span>Sources: {sources.join(", ")}</span>
        <span>Patient flow volume (daily avg)</span>
      </div>
    </div>
  );
}
