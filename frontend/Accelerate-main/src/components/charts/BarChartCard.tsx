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
  color = "#0ea5e9",
  height = 260,
  unit = "",
}: BarChartCardProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
        <XAxis dataKey={xKey} tick={{ fontSize: 11 }} stroke="#94a3b8" />
        <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" unit={unit} />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} name={dataKey} />
      </BarChart>
    </ResponsiveContainer>
  );
}
