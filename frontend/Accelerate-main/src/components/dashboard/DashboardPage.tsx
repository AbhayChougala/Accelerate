"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import type { KpiMetric } from "@/lib/types";

interface DashboardPageProps {
  title: string;
  subtitle?: string;
  kpis?: KpiMetric[];
  children: React.ReactNode;
}

export function DashboardPage({ title, subtitle, kpis, children }: DashboardPageProps) {
  return (
    <DashboardShell title={title}>
      {subtitle && (
        <p className="text-sm text-[var(--muted)] -mt-2 mb-4">{subtitle}</p>
      )}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-6">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.id} metric={kpi} index={i} />
          ))}
        </div>
      )}
      {children}
    </DashboardShell>
  );
}

export { SectionHeader, GlassCard, KpiCard };
