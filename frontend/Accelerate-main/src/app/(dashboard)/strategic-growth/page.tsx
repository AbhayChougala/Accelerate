"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { HeatmapGrid } from "@/components/charts/HeatmapGrid";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Market Share", value: "8.4%", change: 0.6, trend: "up" },
  { id: "2", label: "Medical Tourism Rev", value: "₹2.1 Cr", change: 18, trend: "up", status: "good" },
  { id: "3", label: "Tier-2/3 Patients", value: "34%", change: 4.2, trend: "up" },
  { id: "4", label: "New Service ROI", value: "142%", change: 12, trend: "up", status: "good" },
];

const growthHeatmap = [
  { dept: "Cardiology", h8: 72, h10: 85, h12: 90, h14: 88, h16: 82 },
  { dept: "Oncology", h8: 65, h10: 78, h12: 88, h14: 92, h16: 85 },
  { dept: "Tier-2 Expansion", h8: 55, h10: 68, h12: 82, h14: 90, h16: 95 },
  { dept: "Medical Tourism", h8: 40, h10: 55, h12: 72, h14: 85, h16: 88 },
];

const serviceLines = [
  { name: "Cardiac Sciences", profit: 34, growth: 12 },
  { name: "Oncology", profit: 28, growth: 18 },
  { name: "Robotic Surgery", profit: 22, growth: 42 },
  { name: "Wellness & Preventive", profit: 18, growth: 28 },
];

export default function StrategicGrowthDashboard() {
  return (
    <DashboardPage title="Strategic Growth" subtitle="Market share, expansion opportunities & medical tourism" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Growth Opportunity Heatmap" />
          <HeatmapGrid data={growthHeatmap} />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Service Line Profitability" />
          <div className="space-y-4">
            {serviceLines.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-emerald-600">+{s.growth}% growth</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500" style={{ width: `${s.profit * 2.5}%` }} />
                </div>
                <p className="text-xs text-[var(--muted)] mt-0.5">Margin: {s.profit}%</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="Future Investment Recommendations" />
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Pune Greenfield", roi: "18% IRR", desc: "Tier-2 city gap. 200-bed facility simulation positive." },
            { title: "Robotic Surgery Unit", roi: "24 mo payback", desc: "Bangalore — 42% demand growth in ortho robotics." },
            { title: "ABDM Digital Stack", roi: "Strategic", desc: "Full ABDM integration — interoperability & Ayushman efficiency." },
          ].map((i) => (
            <div key={i.title} className="p-4 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50/30 dark:bg-sky-950/20">
              <p className="font-semibold text-sm">{i.title}</p>
              <p className="text-sky-600 text-xs font-medium mt-1">{i.roi}</p>
              <p className="text-xs text-[var(--muted)] mt-2">{i.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
