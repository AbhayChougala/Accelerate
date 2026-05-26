"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/hooks/useChartTheme";

export function GaugeChart({
  value,
  max = 100,
  label,
  color = CHART_COLORS.primary,
}: {
  value: number;
  max?: number;
  label: string;
  color?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const data = [
    { name: "value", value: pct },
    { name: "empty", value: 100 - pct },
  ];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={140} height={90}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={50}
            outerRadius={70}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="var(--border)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p className="text-2xl font-semibold tracking-tight -mt-8 text-[var(--foreground)]">
        {value}{max === 100 ? "%" : ""}
      </p>
      <p className="text-xs text-[var(--muted)] mt-1">{label}</p>
    </div>
  );
}
