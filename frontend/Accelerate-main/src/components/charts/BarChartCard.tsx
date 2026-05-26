"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltipContent } from "./ChartTooltip";
import { useChartTheme, CHART_COLORS } from "@/hooks/useChartTheme";

interface BarChartCardProps {
  data: Record<string, unknown>[];
  dataKey: string;
  xKey: string;
  color?: string;
  height?: number;
  unit?: string;
}

export function BarChartCard({
  data,
  dataKey,
  xKey,
  color = CHART_COLORS.primary,
  height = 260,
  unit = "",
}: BarChartCardProps) {
  const chart = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: chart.text }} />
        <YAxis tick={{ fontSize: 11, fill: chart.text }} unit={unit} />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} name={dataKey} />
      </BarChart>
    </ResponsiveContainer>
  );
}
