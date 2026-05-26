"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { predictiveForecasts, revenueTrend } from "@/lib/data";
import { RevenueTrendChart } from "@/components/charts/RevenueTrendChart";
import { Sparkles } from "lucide-react";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Model Accuracy", value: "87.4%", change: 1.2, trend: "up", status: "good" },
  { id: "2", label: "Active Predictions", value: "24", trend: "neutral" },
  { id: "3", label: "Anomalies Detected", value: "7", change: -2, trend: "down" },
  { id: "4", label: "AI Confidence Avg", value: "84%", change: 2.4, trend: "up" },
];

const scenarios = [
  { name: "Base Case", revenue: 45.1, occupancy: 86, risk: "Low" },
  { name: "High Demand", revenue: 48.2, occupancy: 94, risk: "Medium" },
  { name: "Monsoon Surge", revenue: 42.8, occupancy: 78, risk: "Low" },
  { name: "Staff Shortage", revenue: 41.2, occupancy: 82, risk: "High" },
];

export default function AIPredictiveDashboard() {
  return (
    <DashboardPage title="AI Predictive Analytics" subtitle="ML forecasting, scenario simulation & risk prediction" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {predictiveForecasts.map((p) => (
          <GlassCard key={p.metric}>
            <p className="text-xs text-[var(--muted)]">{p.metric}</p>
            <p className="text-xl font-bold mt-1">{p.predicted}</p>
            <p className="text-xs text-sky-600 mt-1">Current: {p.current}</p>
            <div className="mt-2 h-1 rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-violet-500" style={{ width: `${p.confidence}%` }} />
            </div>
            <p className="text-[10px] text-[var(--muted)] mt-1">{p.confidence}% confidence</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Revenue Forecast" subtitle="12-month ML projection" />
          <RevenueTrendChart data={revenueTrend} />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Scenario Simulation" action={<Sparkles className="h-4 w-4 text-violet-500" />} />
          <div className="space-y-3">
            {scenarios.map((s) => (
              <div key={s.name} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-[var(--muted)]">Revenue: ₹{s.revenue} Cr · Occupancy: {s.occupancy}%</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  s.risk === "Low" ? "bg-emerald-100 text-emerald-700" :
                  s.risk === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                }`}>{s.risk} Risk</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="AI Strategic Recommendations" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "Disease outbreak risk: Dengue — low (12%) in Mumbai. Stock platelets.",
            "Readmission prediction: 24 cardiac patients high-risk. Enable discharge protocols.",
            "Inventory: Insulin demand +22% in 14 days across network.",
            "Fraud: 3 billing anomalies flagged for review.",
          ].map((r, i) => (
            <div key={i} className="p-3 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 text-sm">{r}</div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
