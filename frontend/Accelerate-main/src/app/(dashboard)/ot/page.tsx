"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { GaugeChart } from "@/components/charts/GaugeChart";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "OT Utilization", value: "76%", change: 6.5, trend: "up" },
  { id: "2", label: "Surgeries Today", value: "47", change: 4, trend: "up" },
  { id: "3", label: "Cancellation Rate", value: "3.2%", change: -0.8, trend: "down", status: "good" },
  { id: "4", label: "OT Idle Time", value: "18%", change: -4, trend: "down", status: "good" },
  { id: "5", label: "Emergency Surgeries", value: "6", trend: "neutral" },
  { id: "6", label: "Revenue per OT", value: "₹4.2L", change: 8.2, trend: "up", status: "good" },
];

const otSchedule = [
  { ot: "OT-1", procedure: "CABG", surgeon: "Dr. Sharma", status: "In Progress", time: "08:00-14:00" },
  { ot: "OT-2", procedure: "Knee Replacement", surgeon: "Dr. Patel", status: "Scheduled", time: "10:00-13:00" },
  { ot: "OT-3", procedure: "Appendectomy", surgeon: "Dr. Khan", status: "Completed", time: "07:00-08:30" },
  { ot: "OT-4", procedure: "—", surgeon: "—", status: "Idle", time: "Available" },
];

export default function OTDashboard() {
  return (
    <DashboardPage title="Operating Theatre" subtitle="Surgical efficiency, scheduling & bottleneck detection" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((n) => (
          <GlassCard key={n}>
            <GaugeChart value={[82, 74, 88, 60][n - 1]} label={`OT-${n}`} color={["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b"][n - 1]} />
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <SectionHeader title="Real-time OT Schedule" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--muted)] border-b border-slate-200 dark:border-slate-700">
                <th className="pb-2">OT</th><th className="pb-2">Procedure</th><th className="pb-2">Surgeon</th><th className="pb-2">Status</th><th className="pb-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {otSchedule.map((row) => (
                <tr key={row.ot} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 font-medium">{row.ot}</td>
                  <td className="py-3">{row.procedure}</td>
                  <td className="py-3">{row.surgeon}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      row.status === "In Progress" ? "bg-sky-100 text-sky-700" :
                      row.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                      row.status === "Idle" ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-700"
                    }`}>{row.status}</span>
                  </td>
                  <td className="py-3 text-[var(--muted)]">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
