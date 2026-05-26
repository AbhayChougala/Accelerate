"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { MetricKpiCard } from "@/components/ui/ExecutiveKpi";
import type { KpiMetric } from "@/lib/types";

export function DashboardPage({
  title,
  subtitle,
  kpis,
  children,
  insights,
}: {
  title: string;
  subtitle?: string;
  kpis?: KpiMetric[];
  children: React.ReactNode;
  insights?: React.ReactNode;
}) {
  return (
    <DashboardShell title={title} insights={insights}>
      {subtitle && (
        <p className="text-sm text-[var(--muted)] -mt-1 mb-5">{subtitle}</p>
      )}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi, i) => (
            <MetricKpiCard key={kpi.id} metric={kpi} index={i} />
          ))}
        </div>
      )}
      {children}
    </DashboardShell>
  );
}

export { Card, CardHeader, GlassCard, SectionHeader } from "@/components/ui/card";
