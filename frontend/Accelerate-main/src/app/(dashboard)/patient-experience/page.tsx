"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { patientSatisfactionTrend } from "@/lib/data";
import { DonutChart } from "@/components/charts/DonutChart";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Patient Satisfaction", value: "4.6/5", change: 0.2, trend: "up", status: "good" },
  { id: "2", label: "NPS Score", value: "72", change: 4, trend: "up", status: "good" },
  { id: "3", label: "Avg Wait Time", value: "22 min", change: -8.3, trend: "down", status: "good" },
  { id: "4", label: "Complaints (MTD)", value: "186", change: -12, trend: "down", status: "good" },
  { id: "5", label: "Resolution Time", value: "18 hrs", change: -15, trend: "down", status: "good" },
  { id: "6", label: "No-show Rate", value: "8.4%", change: -1.2, trend: "down", status: "good" },
];

const complaintCategories = [
  { name: "Wait Times", value: 42, fill: "#ef4444" },
  { name: "Billing", value: 28, fill: "#f59e0b" },
  { name: "Staff Behavior", value: 18, fill: "#8b5cf6" },
  { name: "Facilities", value: 12, fill: "#0ea5e9" },
];

export default function PatientExperienceDashboard() {
  return (
    <DashboardPage title="Patient Experience" subtitle="NPS, sentiment analysis & complaint root-cause" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Satisfaction & NPS Trend" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={patientSatisfactionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" domain={[50, 80]} />
              <YAxis yAxisId="right" orientation="right" domain={[4, 5]} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="nps" stroke="#8b5cf6" name="NPS" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="csat" stroke="#10b981" name="CSAT" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Complaint Categories" />
          <DonutChart data={complaintCategories} />
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="AI Patient Experience Insights" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20">
            <p className="font-medium text-sm text-emerald-800 dark:text-emerald-200">Sentiment Analysis</p>
            <p className="text-sm mt-1">78% positive online reviews. Top praise: nursing care, cleanliness. Concern: OPD wait times at Delhi NCR.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20">
            <p className="font-medium text-sm">Root Cause — Wait Times</p>
            <p className="text-sm mt-1">Diagnostics bottleneck 10AM-2PM drives 62% of wait complaints. Recommend express lane for follow-up patients.</p>
          </div>
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
