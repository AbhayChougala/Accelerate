"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const CHART_COLORS = {
  primary: "#2563EB",
  primaryLight: "#60A5FA",
  secondary: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  slate: "#94A3B8",
  palette: ["#2563EB", "#3B82F6", "#6366F1", "#8B5CF6", "#60A5FA", "#10B981"],
};

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return {
    mounted,
    isDark,
    grid: isDark ? "#243041" : "#E5E7EB",
    text: isDark ? "#9CA3AF" : "#6B7280",
    tooltip: {
      background: isDark ? "#111827" : "#FFFFFF",
      border: isDark ? "#243041" : "#E5E7EB",
      color: isDark ? "#F9FAFB" : "#111827",
    },
    colors: CHART_COLORS,
  };
}

export function getTooltipStyle(theme: ReturnType<typeof useChartTheme>) {
  return {
    background: theme.tooltip.background,
    border: `1px solid ${theme.tooltip.border}`,
    borderRadius: 10,
    boxShadow: "var(--shadow-md)",
    fontSize: 12,
    color: theme.tooltip.color,
  };
}
