"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { claimMetrics } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Claim Approval Rate", value: "91.2%", change: 2.1, trend: "up", status: "good" },
  { id: "2", label: "Avg Settlement Time", value: "13.2 days", change: -8, trend: "down", status: "good" },
  { id: "3", label: "Outstanding Claims", value: "₹2.3 Cr", change: -4.2, trend: "down", status: "warning" },
  { id: "4", label: "Insurance Revenue", value: "₹12.4 Cr", change: 9.8, trend: "up" },
  { id: "5", label: "Ayushman Bharat Cases", value: "1,240", change: 14, trend: "up" },
  { id: "6", label: "Fraud Flags (AI)", value: "3", trend: "neutral", status: "warning" },
];

export default function InsuranceDashboard() {
  return (
    <DashboardPage title="Insurance & Claims" subtitle="TPA performance, Ayushman Bharat & fraud detection" kpis={kpis}>
      <GlassCard className="mb-6">
        <SectionHeader title="TPA Performance Comparison" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={claimMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tpa" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="approved" fill="#10b981" name="Approved" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rejected" fill="#ef4444" name="Rejected" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: "AI Rejection Prediction", desc: "18 claims flagged for documentation gaps before submission" },
          { title: "Delayed Settlement Alert", desc: "₹84L with ICICI Lombard pending >30 days" },
          { title: "Fraud Detection", desc: "3 duplicate billing patterns detected — under investigation" },
        ].map((a) => (
          <GlassCard key={a.title}>
            <p className="font-medium text-sm">{a.title}</p>
            <p className="text-xs text-[var(--muted)] mt-2">{a.desc}</p>
          </GlassCard>
        ))}
      </div>
    </DashboardPage>
  );
}
