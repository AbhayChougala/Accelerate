"use client";

import { useChartTheme, getTooltipStyle } from "@/hooks/useChartTheme";

export function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  const chart = useChartTheme();
  if (!active || !payload?.length) return null;
  return (
    <div style={getTooltipStyle(chart)} className="px-3 py-2">
      {label && <p className="font-medium mb-1 text-[var(--foreground)]">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="text-[var(--muted)] text-xs">
          <span style={{ color: p.color }}>{p.name}: </span>
          <span className="font-semibold text-[var(--foreground)]">{p.value}</span>
        </p>
      ))}
    </div>
  );
}
