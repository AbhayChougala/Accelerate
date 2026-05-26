"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { DonutChart } from "@/components/charts/DonutChart";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "Pharmacy Revenue", value: "₹5.4 Cr", change: 7.8, trend: "up", status: "good" },
  { id: "2", label: "Stock Turnover", value: "8.2x", change: 0.4, trend: "up" },
  { id: "3", label: "Expiry Alerts", value: "24 SKUs", change: -6, trend: "down", status: "warning" },
  { id: "4", label: "Medicine Wastage", value: "₹8.2L", change: -12, trend: "down", status: "good" },
  { id: "5", label: "Generic Ratio", value: "42%", change: 3.2, trend: "up" },
  { id: "6", label: "Auto-reorders Pending", value: "18", trend: "neutral" },
];

const medicineMix = [
  { name: "Generic", value: 42, fill: "#10b981" },
  { name: "Branded", value: 58, fill: "#0ea5e9" },
];

export default function PharmacyDashboard() {
  return (
    <DashboardPage title="Pharmacy & Inventory" subtitle="Stock management, demand forecasting & supplier analytics" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <SectionHeader title="Generic vs Branded Mix" />
          <DonutChart data={medicineMix} />
          <p className="text-sm text-center text-[var(--muted)] mt-2">12% margin uplift potential by increasing generic ratio to 55%</p>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Supplier Performance" />
          <div className="space-y-3">
            {[
              { name: "Apollo Pharma Dist.", score: 96, delay: "0.2%" },
              { name: "MedPlus Wholesale", score: 92, delay: "1.1%" },
              { name: "Local Vendor A", score: 78, delay: "8.4%" },
            ].map((s) => (
              <div key={s.name} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40">
                <span className="text-sm font-medium">{s.name}</span>
                <span className="text-sm">Score: <strong>{s.score}</strong> · Delay: {s.delay}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="AI Demand Forecast — Top SKUs" />
        <div className="grid sm:grid-cols-4 gap-3">
          {["Paracetamol 500mg", "Amoxicillin 250mg", "Insulin Glargine", "Metformin 500mg"].map((sku, i) => (
            <div key={sku} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-xs font-medium truncate">{sku}</p>
              <p className="text-lg font-bold text-sky-600 mt-1">+{[12, 8, 22, 6][i]}%</p>
              <p className="text-xs text-[var(--muted)]">demand next 14d</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
