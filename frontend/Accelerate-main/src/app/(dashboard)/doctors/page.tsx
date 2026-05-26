"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { Leaderboard } from "@/components/charts/Leaderboard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { doctorLeaderboard } from "@/lib/data";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Active Doctors", value: "342", trend: "neutral" },
  { id: "2", label: "Avg Patients/Doctor", value: "28.4", change: 4.2, trend: "up" },
  { id: "3", label: "Surgery Success Rate", value: "98.2%", change: 0.3, trend: "up", status: "good" },
  { id: "4", label: "Avg Consultation", value: "18 min", change: -2.1, trend: "down", status: "good" },
  { id: "5", label: "OPD-to-IPD Conversion", value: "12.4%", change: 1.8, trend: "up" },
  { id: "6", label: "Burnout Risk (High)", value: "8", change: -2, trend: "down", status: "warning" },
];

const specialtyData = [
  { specialty: "Cardiology", revenue: 8.2, patients: 1240 },
  { specialty: "Orthopedics", revenue: 6.4, patients: 920 },
  { specialty: "Oncology", revenue: 7.1, patients: 680 },
  { specialty: "Neurology", revenue: 4.8, patients: 540 },
];

export default function DoctorsDashboard() {
  return (
    <DashboardPage title="Doctor Performance" subtitle="Productivity, outcomes & AI performance insights" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Doctor Leaderboard" subtitle="Composite productivity score" />
          <Leaderboard data={doctorLeaderboard} />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Revenue by Specialty (₹ Cr)" />
          <BarChartCard data={specialtyData} dataKey="revenue" xKey="specialty" color="#8b5cf6" />
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="AI Performance Insights" />
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Top Performer", desc: "Dr. Ananya Sharma — 96 score, ₹2.4 Cr revenue, 4.9 rating" },
            { title: "Burnout Alert", desc: "8 doctors flagged — Cardiology (3), Emergency (2). Recommend schedule review." },
            { title: "Growth Opportunity", desc: "Neurology OPD-to-IPD conversion 8.2% vs network avg 12.4%" },
          ].map((i) => (
            <div key={i.title} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40">
              <p className="font-medium text-sm">{i.title}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{i.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
