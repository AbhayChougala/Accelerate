"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { branchComparison } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Total Branches", value: "6", trend: "neutral" },
  { id: "2", label: "Network Revenue", value: "₹42.8 Cr", change: 8.4, trend: "up" },
  { id: "3", label: "Best Branch", value: "Mumbai", trend: "neutral", status: "good" },
  { id: "4", label: "Avg Occupancy", value: "77.7%", change: 2.1, trend: "up" },
];

const radarData = branchComparison.map((b) => ({
  branch: b.city,
  revenue: b.revenue * 8,
  occupancy: b.occupancy,
  satisfaction: b.satisfaction * 20,
  profit: b.profit * 40,
}));

const indiaBranches = [
  { city: "Mumbai", x: 42, y: 68, size: 12.4 },
  { city: "Delhi", x: 48, y: 32, size: 10.8 },
  { city: "Bangalore", x: 44, y: 82, size: 9.2 },
  { city: "Hyderabad", x: 46, y: 58, size: 5.6 },
  { city: "Pune", x: 40, y: 62, size: 3.2 },
  { city: "Chennai", x: 50, y: 88, size: 1.6 },
];

export default function BranchesDashboard() {
  return (
    <DashboardPage title="Multi-Branch Performance" subtitle="Geographic benchmarking & regional growth opportunities" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Branch Revenue Comparison (₹ Cr)" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={branchComparison} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Multi-dimensional Benchmarking" />
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="branch" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis />
              <Radar name="Revenue" dataKey="revenue" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} />
              <Radar name="Occupancy" dataKey="occupancy" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="Geographic Branch Map" subtitle="Bubble size = revenue (₹ Cr)" />
        <div className="relative w-full h-64 bg-gradient-to-br from-sky-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="absolute top-2 left-3 text-xs text-[var(--muted)]">India — Accelerate Network</p>
          {indiaBranches.map((b) => (
            <div
              key={b.city}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <div
                className="rounded-full bg-sky-500/80 border-2 border-white dark:border-slate-700 flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:scale-110 transition-transform"
                style={{ width: `${20 + b.size * 3}px`, height: `${20 + b.size * 3}px` }}
                title={`${b.city}: ₹${b.size} Cr`}
              >
                {b.size > 5 ? b.city.slice(0, 3) : ""}
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {b.city} ₹{b.size}Cr
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
