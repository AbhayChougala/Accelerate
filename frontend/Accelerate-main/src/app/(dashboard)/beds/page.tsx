"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { HeatmapGrid } from "@/components/charts/HeatmapGrid";
import { wardOccupancy, weeklyOccupancy, predictiveForecasts } from "@/lib/data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Total Beds", value: "1,240", trend: "neutral" },
  { id: "2", label: "Occupied", value: "1,022", change: 2.1, trend: "up" },
  { id: "3", label: "Available", value: "218", change: -12.4, trend: "down", status: "warning" },
  { id: "4", label: "ICU Occupancy", value: "89%", change: 4.2, trend: "up", status: "warning" },
  { id: "5", label: "Ventilators Available", value: "14/68", status: "warning" },
  { id: "6", label: "Bed Turnover Rate", value: "2.4/day", change: 5.2, trend: "up" },
  { id: "7", label: "Avg Length of Stay", value: "4.2 days", change: -0.3, trend: "down", status: "good" },
  { id: "8", label: "AI Demand Forecast", value: "94% peak", change: 0, trend: "up", status: "critical" },
];

export default function BedsDashboard() {
  return (
    <DashboardPage title="Bed & Capacity Management" subtitle="Live ward visualization · AI demand forecasting" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <GlassCard><GaugeChart value={82} label="Overall Occupancy" color="#0ea5e9" /></GlassCard>
        <GlassCard><GaugeChart value={89} label="ICU Occupancy" color="#ef4444" /></GlassCard>
        <GlassCard><GaugeChart value={76} label="Emergency Beds" color="#f59e0b" /></GlassCard>
        <GlassCard><GaugeChart value={21} max={68} label="Ventilators Free" color="#10b981" /></GlassCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Live Ward Status" />
          <div className="space-y-2">
            {wardOccupancy.map((w) => {
              const pct = Math.round((w.occupied / w.total) * 100);
              return (
                <div key={w.ward} className="flex items-center gap-3">
                  <span className="w-28 text-sm font-medium truncate">{w.ward}</span>
                  <div className="flex-1 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <div
                      className={`h-full rounded-lg ${w.icu ? "bg-red-500" : "bg-sky-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                      {w.occupied}/{w.total} ({pct}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Occupancy Forecast (7 days)" />
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyOccupancy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[60, 100]} unit="%" />
              <Tooltip />
              <Line type="monotone" dataKey="general" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="icu" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="AI Capacity Recommendations" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {predictiveForecasts.filter((p) => p.metric.includes("Bed") || p.metric.includes("Inflow")).map((p) => (
            <div key={p.metric} className="p-4 rounded-xl bg-violet-50/50 dark:bg-violet-950/20">
              <p className="text-sm font-medium">{p.metric}</p>
              <p className="text-2xl font-bold mt-1">{p.predicted}{typeof p.predicted === "number" && p.metric.includes("%") ? "%" : ""}</p>
              <p className="text-xs text-[var(--muted)]">Confidence: {p.confidence}%</p>
            </div>
          ))}
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 sm:col-span-2">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Recommendation</p>
            <p className="text-sm mt-1">Add 6 ICU beds at Mumbai Central by Week 3. Defer elective admissions Thu-Sat during peak occupancy.</p>
          </div>
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
