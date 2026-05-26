"use client";

import { KpiCard } from "./KpiCard";
import type { LucideIcon } from "lucide-react";
import type { KpiMetric } from "@/lib/types";

export function ExecutiveKpi({
  icon: Icon,
  label,
  value,
  delta,
  critical,
  delay = 1,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta?: number;
  critical?: boolean;
  delay?: number;
}) {
  const up = delta !== undefined && delta >= 0;
  return (
    <KpiCard
      label={label}
      value={value}
      change={delta}
      trend={up ? "up" : "down"}
      icon={Icon}
      critical={critical}
      index={delay}
    />
  );
}

export function MetricKpiCard({ metric, index = 0 }: { metric: KpiMetric; index?: number }) {
  return (
    <KpiCard
      label={metric.label}
      value={metric.value}
      change={metric.change}
      trend={metric.trend}
      critical={metric.status === "critical" || metric.status === "warning"}
      index={index}
    />
  );
}
