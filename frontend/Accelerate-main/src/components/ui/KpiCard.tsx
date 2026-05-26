"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiMetric } from "@/lib/types";

const statusColors = {
  good: "border-emerald-200/60 dark:border-emerald-800/40",
  warning: "border-amber-200/60 dark:border-amber-800/40",
  critical: "border-red-200/60 dark:border-red-800/40",
};

export function KpiCard({ metric, index = 0 }: { metric: KpiMetric; index?: number }) {
  const TrendIcon =
    metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : Minus;
  const trendColor =
    metric.trend === "up"
      ? metric.status === "warning"
        ? "text-amber-600"
        : "text-emerald-600"
      : metric.trend === "down"
        ? metric.status === "good"
          ? "text-emerald-600"
          : "text-red-500"
        : "text-slate-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
      className={cn(
        "glass-card p-4 hover:shadow-md transition-shadow cursor-default",
        metric.status && statusColors[metric.status]
      )}
    >
      <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide truncate">
        {metric.label}
      </p>
      <p className="mt-1 text-xl font-bold text-[var(--foreground)] tabular-nums">
        {metric.value}
      </p>
      {metric.change !== undefined && (
        <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", trendColor)}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span>{metric.change > 0 ? "+" : ""}{metric.change}%</span>
          <span className="text-[var(--muted)] font-normal">vs last period</span>
        </div>
      )}
    </motion.div>
  );
}
