"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4"
    >
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--muted)] mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </motion.div>
  );
}
