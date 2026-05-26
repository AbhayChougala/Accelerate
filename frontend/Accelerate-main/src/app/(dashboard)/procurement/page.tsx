"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { BarChartCard } from "@/components/charts/BarChartCard";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Procurement Spend (MTD)", value: "₹8.4 Cr", change: 4.2, trend: "up" },
  { id: "2", label: "On-time Delivery", value: "91.2%", change: 2.1, trend: "up", status: "good" },
  { id: "3", label: "Contract Compliance", value: "96%", change: 1, trend: "up", status: "good" },
  { id: "4", label: "Inventory Wastage", value: "₹12.4L", change: -8, trend: "down", status: "good" },
];

const vendorScores = [
  { vendor: "Siemens Healthineers", score: 94 },
  { vendor: "Philips India", score: 91 },
  { vendor: "Local Med Supplies", score: 76 },
  { vendor: "Pharma Distributors", score: 88 },
];

export default function ProcurementDashboard() {
  return (
    <DashboardPage title="Procurement & Vendor" subtitle="Supplier scoring, cost optimization & contract compliance" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeader title="Smart Supplier Scoring" />
          <BarChartCard data={vendorScores} dataKey="score" xKey="vendor" color="#10b981" />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Procurement Optimization Insights" />
          <div className="space-y-3">
            {[
              "Consolidate lab consumables — ₹24L annual savings potential",
              "Renegotiate Siemens maintenance contract — 8% reduction identified",
              "Local Vendor A — delivery delays 8.4%. Consider alternate supplier.",
              "Bulk medicine procurement Q2 — 6% cost reduction via network pooling",
            ].map((insight, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 text-sm">{insight}</div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardPage>
  );
}
