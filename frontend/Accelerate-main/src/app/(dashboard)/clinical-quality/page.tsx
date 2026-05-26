"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { GaugeChart } from "@/components/charts/GaugeChart";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "NABH Compliance", value: "94%", change: 2, trend: "up", status: "good" },
  { id: "2", label: "HAI Rate", value: "0.8%", change: -0.2, trend: "down", status: "good" },
  { id: "3", label: "Mortality Rate", value: "1.2%", change: -0.1, trend: "down", status: "good" },
  { id: "4", label: "Medication Errors", value: "12", change: -25, trend: "down", status: "good" },
  { id: "5", label: "ICU Outcomes", value: "92%", change: 1.4, trend: "up", status: "good" },
  { id: "6", label: "Safety Incidents", value: "4", change: -33, trend: "down", status: "good" },
];

export default function ClinicalQualityDashboard() {
  return (
    <DashboardPage title="Clinical Quality & Compliance" subtitle="NABH, patient safety & quality benchmarking" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <GlassCard><GaugeChart value={94} label="NABH Score" color="#10b981" /></GlassCard>
        <GlassCard><GaugeChart value={88} label="Quality Index" color="#0ea5e9" /></GlassCard>
        <GlassCard><GaugeChart value={92} label="ICU Outcomes" color="#8b5cf6" /></GlassCard>
        <GlassCard><GaugeChart value={96} label="Surgical Safety" color="#14b8a6" /></GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="Risk Alerts & Benchmarking" />
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Infection Control", status: "On Track", bench: "Top 15% nationally", color: "emerald" },
            { title: "Surgical Complications", status: "Monitor", bench: "At national average", color: "amber" },
            { title: "Documentation (NABH)", status: "Action Required", bench: "Cardiology audit in 5 days", color: "red" },
            { title: "ICU Mortality", status: "Excellent", bench: "Top 10% in tier-1 cities", color: "emerald" },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-[var(--muted)] mt-1">Status: {item.status}</p>
              <p className="text-xs text-sky-600 mt-1">{item.bench}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
