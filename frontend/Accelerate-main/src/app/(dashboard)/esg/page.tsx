"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { esgMetrics } from "@/lib/data";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "ESG Score", value: "82/100", change: 4, trend: "up", status: "good" },
  { id: "2", label: "Energy (kWh/bed)", value: "42", change: -6, trend: "down", status: "good" },
  { id: "3", label: "Carbon Footprint", value: "2.4 tCO2e", change: -8, trend: "down", status: "good" },
  { id: "4", label: "CSR Patients Reached", value: "12,400", change: 22, trend: "up" },
];

export default function ESGDashboard() {
  return (
    <DashboardPage title="Sustainability & ESG" subtitle="Environmental impact, waste management & CSR outreach" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <GlassCard className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
          <GaugeChart value={82} label="Overall ESG Score" color="#10b981" />
        </GlassCard>
        {esgMetrics.map((m) => {
          const pct = Math.min(100, (m.value / m.target) * 100);
          const onTrack = m.metric.includes("CSR") ? m.value >= m.target * 0.8 : m.value <= m.target;
          return (
            <GlassCard key={m.metric}>
              <p className="text-xs text-[var(--muted)] truncate">{m.metric}</p>
              <p className="text-2xl font-bold mt-1">{m.value}</p>
              <p className="text-xs text-[var(--muted)]">Target: {m.target} {m.unit}</p>
              <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${onTrack ? "bg-emerald-500" : "bg-amber-500"}`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>
            </GlassCard>
          );
        })}
      </div>
      <GlassCard>
        <SectionHeader title="Sustainability Benchmarks" subtitle="vs industry standards — Indian healthcare" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { metric: "Biomedical Waste", status: "Above target", action: "Upgrade segregation at 2 branches" },
            { metric: "Solar Adoption", status: "32% energy", action: "Expand rooftop solar — Pune, Hyderabad" },
            { metric: "Water Recycling", status: "45% recycled", action: "On track for 55% by Q4" },
            { metric: "Green Procurement", status: "68% compliant", action: "Vendor ESG scoring implemented" },
          ].map((b) => (
            <div key={b.metric} className="p-4 rounded-xl bg-emerald-50/30 dark:bg-emerald-950/20">
              <p className="font-medium text-sm">{b.metric}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">{b.status}</p>
              <p className="text-xs text-[var(--muted)] mt-2">{b.action}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
