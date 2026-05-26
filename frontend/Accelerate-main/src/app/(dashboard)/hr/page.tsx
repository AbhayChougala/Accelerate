"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { GaugeChart } from "@/components/charts/GaugeChart";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Total Staff", value: "4,820", trend: "neutral" },
  { id: "2", label: "Attendance Today", value: "94.2%", change: 0.8, trend: "up", status: "good" },
  { id: "3", label: "Nurse:Patient Ratio", value: "1:4.2", change: -0.2, trend: "down", status: "good" },
  { id: "4", label: "Overtime Cost (MTD)", value: "₹42L", change: 12.4, trend: "up", status: "warning" },
  { id: "5", label: "Attrition Rate", value: "8.2%", change: -0.6, trend: "down", status: "good" },
  { id: "6", label: "Open Positions", value: "124", change: 8, trend: "up", status: "warning" },
];

const deptStaffing = [
  { dept: "Nursing", gap: 42, filled: 892 },
  { dept: "Lab Tech", gap: 18, filled: 156 },
  { dept: "Pharmacy", gap: 12, filled: 84 },
  { dept: "Admin", gap: 24, filled: 320 },
];

export default function HRDashboard() {
  return (
    <DashboardPage title="Staff & HR Analytics" subtitle="Workforce planning, burnout prediction & payroll insights" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <GlassCard><GaugeChart value={94} label="Attendance" color="#10b981" /></GlassCard>
        <GlassCard><GaugeChart value={78} label="Employee Satisfaction" color="#0ea5e9" /></GlassCard>
        <GlassCard><GaugeChart value={82} label="Training Completion" color="#8b5cf6" /></GlassCard>
        <GlassCard><GaugeChart value={22} label="Burnout Risk %" color="#f59e0b" /></GlassCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeader title="Department Staffing Gaps" />
          <BarChartCard data={deptStaffing} dataKey="gap" xKey="dept" color="#ef4444" />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Workforce Forecasting" />
          <div className="space-y-3">
            {[
              { period: "Q2 2026", need: "+86 nurses, +24 lab techs", confidence: 88 },
              { period: "Q3 2026", need: "+42 nurses (seasonal)", confidence: 76 },
              { period: "Attrition Risk", need: "12 senior nurses — retention program recommended", confidence: 82 },
            ].map((f) => (
              <div key={f.period} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40">
                <p className="font-medium text-sm">{f.period}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{f.need}</p>
                <p className="text-xs text-sky-600 mt-1">AI Confidence: {f.confidence}%</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardPage>
  );
}
