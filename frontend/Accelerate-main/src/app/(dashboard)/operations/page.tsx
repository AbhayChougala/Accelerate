"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { HeatmapGrid } from "@/components/charts/HeatmapGrid";
import { GaugeChart } from "@/components/charts/GaugeChart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { hourlyThroughput, heatmapCongestion, weeklyOccupancy } from "@/lib/data";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "OPD Flow Today", value: "2,847", change: 12.3, trend: "up" },
  { id: "2", label: "IPD Admissions", value: "186", change: -2.1, trend: "down" },
  { id: "3", label: "Avg Wait Time", value: "22 min", change: -8.3, trend: "down", status: "good" },
  { id: "4", label: "Discharges Today", value: "142", change: 4.2, trend: "up" },
  { id: "5", label: "Throughput Score", value: "87/100", change: 3.1, trend: "up" },
  { id: "6", label: "Workflow Efficiency", value: "91%", change: 2.4, trend: "up", status: "good" },
];

export default function OperationsDashboard() {
  return (
    <DashboardPage title="Hospital Operations" subtitle="Real-time flow, congestion & throughput analytics" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Workflow Efficiency" />
          <GaugeChart value={91} label="Efficiency Score" color="#10b981" />
        </GlassCard>
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Hourly Throughput" subtitle="OPD · IPD · Emergency" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={hourlyThroughput}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="opd" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} name="OPD" />
              <Area type="monotone" dataKey="ipd" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="IPD" />
              <Area type="monotone" dataKey="er" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="ER" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Department Congestion Heatmap" />
          <HeatmapGrid data={heatmapCongestion} />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Weekly Occupancy Trend" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklyOccupancy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="general" stroke="#0ea5e9" name="General" />
              <Line type="monotone" dataKey="icu" stroke="#ef4444" name="ICU" />
              <Line type="monotone" dataKey="emergency" stroke="#f59e0b" name="Emergency" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="Real-time Occupancy Map" subtitle="Ward-level status" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["General A", "General B", "Cardiac ICU", "Medical ICU", "Pediatric", "Maternity", "Emergency", "Oncology"].map(
            (w, i) => {
              const occ = [82, 78, 92, 95, 70, 88, 80, 86][i];
              return (
                <div key={w} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium">{w}</p>
                  <p className={`text-2xl font-bold mt-1 ${occ > 90 ? "text-red-500" : occ > 80 ? "text-amber-500" : "text-emerald-600"}`}>
                    {occ}%
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-sky-500" style={{ width: `${occ}%` }} />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
