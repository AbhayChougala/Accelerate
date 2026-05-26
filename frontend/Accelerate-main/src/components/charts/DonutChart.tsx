"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltipContent } from "./ChartTooltip";

interface DonutItem {
  name: string;
  value: number;
  color?: string;
  fill?: string;
}

const DEFAULT_COLORS = ["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6"];

export function DonutChart({ data, height = 260 }: { data: DonutItem[]; height?: number }) {
  const chartData = data.map((d, i) => ({
    ...d,
    fill: d.fill || d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
