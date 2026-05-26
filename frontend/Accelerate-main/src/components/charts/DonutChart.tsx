"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltipContent } from "./ChartTooltip";
import { CHART_COLORS } from "@/hooks/useChartTheme";

interface DonutItem {
  name: string;
  value: number;
  color?: string;
  fill?: string;
}

export function DonutChart({ data, height = 260 }: { data: DonutItem[]; height?: number }) {
  const chartData = data.map((d, i) => ({
    ...d,
    fill: d.fill || d.color || CHART_COLORS.palette[i % CHART_COLORS.palette.length],
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
