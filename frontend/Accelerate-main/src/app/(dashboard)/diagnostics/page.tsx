"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { BarChartCard } from "@/components/charts/BarChartCard";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Tests Today", value: "3,842", change: 8.4, trend: "up" },
  { id: "2", label: "Diagnostics Revenue", value: "₹8.1 Cr", change: 11.2, trend: "up", status: "good" },
  { id: "3", label: "Avg TAT", value: "4.2 hrs", change: -12, trend: "down", status: "good" },
  { id: "4", label: "MRI Utilization", value: "86%", change: 4.2, trend: "up" },
  { id: "5", label: "CT Utilization", value: "78%", change: 2.1, trend: "up" },
  { id: "6", label: "Repeat Test Rate", value: "4.2%", change: -0.8, trend: "down", status: "good" },
];

const equipmentData = [
  { name: "MRI", utilization: 86, roi: 142 },
  { name: "CT", utilization: 78, roi: 128 },
  { name: "X-Ray", utilization: 92, roi: 98 },
  { name: "Pathology", utilization: 88, roi: 156 },
];

export default function DiagnosticsDashboard() {
  return (
    <DashboardPage title="Diagnostics & Lab Analytics" subtitle="TAT, equipment ROI & demand forecasting" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {equipmentData.map((e) => (
          <GlassCard key={e.name}>
            <GaugeChart value={e.utilization} label={`${e.name} Utilization`} color="#0ea5e9" />
            <p className="text-center text-xs text-[var(--muted)] mt-2">ROI: {e.roi}%</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeader title="Equipment Utilization" />
          <BarChartCard data={equipmentData} dataKey="utilization" xKey="name" color="#8b5cf6" unit="%" />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="AI Alerts" />
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-sm">Ultrasound Unit 3 — 34% utilization. Consider redeployment or marketing push.</div>
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sm">Peak demand forecast: MRI +18% next week. Pre-book maintenance outside peak hours.</div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-sm">Test error rate spike in Histopathology — 2.1% vs 0.8% baseline. QA review initiated.</div>
          </div>
        </GlassCard>
      </div>
    </DashboardPage>
  );
}
