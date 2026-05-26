"use client";

import { motion } from "framer-motion";
import { Sparkles, Lightbulb, Building2, AlertTriangle } from "lucide-react";
import {
  DashboardPage,
  SectionHeader,
  GlassCard,
} from "@/components/dashboard/DashboardPage";
import { KpiCard } from "@/components/ui/KpiCard";
import { HealthScore } from "@/components/ui/HealthScore";
import { AlertPanel } from "@/components/ui/AlertPanel";
import { RevenueTrendChart } from "@/components/charts/RevenueTrendChart";
import { DonutChart } from "@/components/charts/DonutChart";
import {
  ceoKpis,
  revenueTrend,
  hospitalHealthScore,
  executiveSummary,
  aiRecommendations,
  criticalAlerts,
  branchComparison,
  topDepartments,
  todaySnapshot,
  revenueByDepartment,
} from "@/lib/data";

export default function CEOCommandCenter() {
  return (
    <DashboardPage title="CEO Executive Command Center" subtitle="Real-time hospital network intelligence · MedVista Health">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-6">
        {ceoKpis.map((kpi, i) => (
          <KpiCard key={kpi.id} metric={kpi} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <GlassCard className="xl:col-span-2" delay={0.1}>
          <SectionHeader
            title="AI Executive Summary"
            subtitle="Auto-generated insights · Updated every 15 min"
            action={
              <span className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 font-medium">
                <Sparkles className="h-3.5 w-3.5" /> AI Powered
              </span>
            }
          />
          <p className="text-sm leading-relaxed text-[var(--foreground)]">{executiveSummary}</p>
          <div className="mt-4 space-y-2">
            {aiRecommendations.map((rec) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40"
              >
                <Lightbulb
                  className={`h-4 w-4 shrink-0 mt-0.5 ${
                    rec.priority === "high"
                      ? "text-amber-500"
                      : rec.priority === "medium"
                        ? "text-sky-500"
                        : "text-slate-400"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">{rec.text}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Impact: {rec.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.15}>
          <SectionHeader title="Hospital Health Score" />
          <div className="flex justify-center py-2">
            <HealthScore score={hospitalHealthScore} />
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard className="lg:col-span-2" delay={0.2}>
          <SectionHeader title="Revenue Trend & Forecasting" subtitle="₹ Crores · ML-powered forecast" />
          <RevenueTrendChart data={revenueTrend} />
        </GlassCard>

        <GlassCard delay={0.25}>
          <SectionHeader
            title="Critical Alerts"
            action={
              <span className="flex items-center gap-1 text-xs text-red-500">
                <AlertTriangle className="h-3.5 w-3.5" /> {criticalAlerts.filter((a) => a.severity === "critical").length} critical
              </span>
            }
          />
          <AlertPanel alerts={criticalAlerts} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard delay={0.3}>
          <SectionHeader title="Revenue by Department" />
          <DonutChart data={revenueByDepartment} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {revenueByDepartment.slice(0, 4).map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span>{d.name}: ₹{d.value} Cr</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.35}>
          <SectionHeader title="Branch Comparison" subtitle="MTD performance across network" />
          <div className="space-y-3">
            {branchComparison.map((b) => (
              <div key={b.id} className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-sky-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{b.name}</span>
                    <span className="text-[var(--muted)]">₹{b.revenue} Cr</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                      style={{ width: `${b.occupancy}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[var(--muted)] mt-0.5">
                    <span>Occupancy {b.occupancy}%</span>
                    <span>CSAT {b.satisfaction}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard delay={0.4} className="mb-6">
        <SectionHeader title="Today's Hospital Snapshot" subtitle="Live operational pulse · May 26, 2026" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {todaySnapshot.map((item) => (
            <div
              key={item.label}
              className="text-center p-4 rounded-xl bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-slate-800/40 dark:to-sky-950/20"
            >
              <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{item.value}</p>
              <p className="text-xs font-medium mt-1">{item.label}</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard delay={0.45}>
        <SectionHeader title="Top Performing Departments" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--muted)] border-b border-slate-200 dark:border-slate-700">
                <th className="pb-2 font-medium">Department</th>
                <th className="pb-2 font-medium">Revenue (Cr)</th>
                <th className="pb-2 font-medium">Patients</th>
                <th className="pb-2 font-medium">Margin %</th>
              </tr>
            </thead>
            <tbody>
              {topDepartments.map((d) => (
                <tr key={d.name} className="border-b border-slate-100 dark:border-slate-800/60">
                  <td className="py-3 font-medium">{d.name}</td>
                  <td className="py-3">₹{d.revenue}</td>
                  <td className="py-3">{d.patients.toLocaleString("en-IN")}</td>
                  <td className="py-3">
                    <span className="text-emerald-600 font-medium">{d.margin}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
