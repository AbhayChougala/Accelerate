"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { GaugeChart } from "@/components/charts/GaugeChart";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "ER Wait Time", value: "28 min", change: -6, trend: "down", status: "warning" },
  { id: "2", label: "Ambulance Response", value: "11 min", change: -8, trend: "down", status: "good" },
  { id: "3", label: "Trauma Cases Today", value: "18", change: 12, trend: "up" },
  { id: "4", label: "Critical Emergencies", value: "12", trend: "neutral", status: "warning" },
  { id: "5", label: "ER Admissions", value: "48", change: 8, trend: "up" },
  { id: "6", label: "Ambulances Active", value: "8/12", trend: "neutral" },
];

const ambulances = [
  { id: "AMB-01", location: "Andheri West", status: "En route", eta: "6 min", case: "Cardiac" },
  { id: "AMB-04", location: "Bandra", status: "At scene", eta: "—", case: "Trauma" },
  { id: "AMB-07", location: "Hospital", status: "Available", eta: "—", case: "—" },
  { id: "AMB-09", location: "Powai", status: "En route", eta: "14 min", case: "Stroke" },
];

export default function EmergencyDashboard() {
  return (
    <DashboardPage title="Emergency & Ambulance" subtitle="Live tracking, ER crowding & resource allocation" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard><GaugeChart value={72} label="ER Capacity" color="#f59e0b" /></GlassCard>
        <GlassCard><GaugeChart value={47} label="Delhi ER Wait (min)" color="#ef4444" /></GlassCard>
        <GlassCard><GaugeChart value={11} max={30} label="Avg Response (min)" color="#10b981" /></GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="Live Ambulance Tracking" />
        <div className="space-y-3">
          {ambulances.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 font-bold text-xs">
                {a.id.split("-")[1]}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{a.id} · {a.location}</p>
                <p className="text-xs text-[var(--muted)]">{a.case !== "—" ? `Case: ${a.case}` : "Standby"}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                a.status === "Available" ? "bg-emerald-100 text-emerald-700" :
                a.status === "En route" ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
              }`}>{a.status}</span>
              {a.eta !== "—" && <span className="text-sm font-medium">ETA: {a.eta}</span>}
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardPage>
  );
}
