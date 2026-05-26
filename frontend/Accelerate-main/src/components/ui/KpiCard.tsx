"use client";

import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Minus, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export function KpiCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  subtitle,
  critical,
  index = 0,
}: {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  subtitle?: string;
  critical?: boolean;
  index?: number;
}) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendPositive = change !== undefined && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={cn(
        "dashboard-card p-5 flex flex-col justify-between min-h-[120px]",
        critical && "ring-1 ring-[var(--danger)]/25 border-[var(--danger)]/20"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide">{label}</p>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-light)] dark:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]">
            <Icon className="h-4 w-4 text-[var(--primary)]" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
          {value}
        </p>
        {subtitle && <p className="text-xs text-[var(--muted)] mt-0.5">{subtitle}</p>}
        {change !== undefined && (
          <div
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-xs font-medium rounded-md px-1.5 py-0.5",
              trendPositive
                ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40"
                : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/40"
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {trendPositive ? "+" : ""}
            {change}%
          </div>
        )}
      </div>
    </motion.div>
  );
}
