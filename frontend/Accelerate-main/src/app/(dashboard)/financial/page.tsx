"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { DonutChart } from "@/components/charts/DonutChart";
import { RevenueTrendChart } from "@/components/charts/RevenueTrendChart";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { SankeyFlow } from "@/components/charts/SankeyFlow";
import {
  revenueByDepartment,
  opdVsIpd,
  expenseBreakdown,
  revenueTrend,
  branchComparison,
  sankeyFlow,
} from "@/lib/data";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Gross Margin", value: "38.2%", change: 1.4, trend: "up", status: "good" },
  { id: "2", label: "Net Margin", value: "14.5%", change: 0.8, trend: "up" },
  { id: "3", label: "EBITDA", value: "₹9.4 Cr", change: 3.8, trend: "up" },
  { id: "4", label: "Cost per Patient", value: "₹18,420", change: -2.1, trend: "down", status: "good" },
  { id: "5", label: "Cost per Bed", value: "₹42,800", change: 1.2, trend: "up" },
  { id: "6", label: "Outstanding Dues", value: "₹4.2 Cr", change: -8.4, trend: "down", status: "warning" },
  { id: "7", label: "Budget vs Actual", value: "102%", change: 2.0, trend: "up" },
  { id: "8", label: "GST Liability (MTD)", value: "₹1.8 Cr", change: 6.2, trend: "up" },
];

export default function FinancialDashboard() {
  return (
    <DashboardPage title="Financial Analytics" subtitle="Revenue, profitability, expenses & cash flow intelligence" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Revenue Mix (OPD vs IPD vs Services)" />
          <DonutChart data={opdVsIpd} />
        </GlassCard>
        <GlassCard delay={0.05}>
          <SectionHeader title="Revenue by Department" />
          <DonutChart data={revenueByDepartment} />
        </GlassCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Revenue Trend & AI Profit Forecast" />
          <RevenueTrendChart data={revenueTrend} />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Expense Breakdown (₹ Cr)" />
          <BarChartCard data={expenseBreakdown} dataKey="amount" xKey="category" color="#8b5cf6" />
        </GlassCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Revenue Flow (Patient Journey)" subtitle="Sankey-style revenue attribution" />
          <SankeyFlow data={sankeyFlow} />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Branch Revenue Comparison" />
          <BarChartCard
            data={branchComparison.map((b) => ({ name: b.city, revenue: b.revenue, profit: b.profit }))}
            dataKey="revenue"
            xKey="name"
            color="#0ea5e9"
          />
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="Financial Intelligence" subtitle="AI-detected anomalies & insights" />
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Revenue Anomaly", desc: "Orthopedics -14% vs forecast — elective surgery decline", severity: "warning" },
            { title: "Delayed Payments", desc: "₹2.3 Cr insurance settlements pending >45 days", severity: "critical" },
            { title: "Profit Prediction", desc: "Q2 forecast: ₹19.2 Cr profit (+7.2% YoY) at 85% confidence", severity: "good" },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
