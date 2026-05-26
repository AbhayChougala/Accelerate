"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Card({
  children,
  className,
  hover = true,
  padding = true,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay * 0.04 }}
      className={cn(
        "dashboard-card",
        hover && "hover:border-[color-mix(in_srgb,var(--primary)_20%,var(--border))]",
        padding && "p-5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3 mb-4", className)}>
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-xs text-[var(--muted)] mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** @deprecated use Card */
export function GlassCard({
  children,
  className,
  glow,
  danger,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  danger?: boolean;
  delay?: number;
}) {
  return (
    <Card
      delay={delay}
      className={cn(
        glow && "ring-1 ring-[var(--primary)]/20",
        danger && "ring-1 ring-[var(--danger)]/30 border-[var(--danger)]/20",
        className
      )}
    >
      {children}
    </Card>
  );
}

export const SectionHeader = CardHeader;
