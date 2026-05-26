"use client";

import { DashboardPage, SectionHeader, GlassCard } from "@/components/dashboard/DashboardPage";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { KpiMetric } from "@/lib/types";

const kpis: KpiMetric[] = [
  { id: "1", label: "HMS Uptime", value: "99.94%", change: 0.02, trend: "up", status: "good" },
  { id: "2", label: "Cyber Incidents", value: "0", trend: "neutral", status: "good" },
  { id: "3", label: "Telemedicine Sessions", value: "234", change: 28, trend: "up" },
  { id: "4", label: "UPI Payment Share", value: "68%", change: 12, trend: "up", status: "good" },
  { id: "5", label: "ABDM Records Linked", value: "84%", change: 6, trend: "up" },
  { id: "6", label: "App DAU", value: "12.4K", change: 18, trend: "up" },
];

const uptimeData = [
  { day: "Mon", uptime: 99.9 },
  { day: "Tue", uptime: 99.95 },
  { day: "Wed", uptime: 99.92 },
  { day: "Thu", uptime: 100 },
  { day: "Fri", uptime: 99.98 },
  { day: "Sat", uptime: 99.94 },
  { day: "Sun", uptime: 99.96 },
];

export default function DigitalDashboard() {
  return (
    <DashboardPage title="Digital Infrastructure" subtitle="HMS, ABDM, cybersecurity & telemedicine metrics" kpis={kpis}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <GlassCard><GaugeChart value={99.9} label="HMS Uptime" color="#10b981" /></GlassCard>
        <GlassCard><GaugeChart value={84} label="ABDM Integration" color="#0ea5e9" /></GlassCard>
        <GlassCard><GaugeChart value={68} label="Digital Payments" color="#8b5cf6" /></GlassCard>
        <GlassCard><GaugeChart value={92} label="Tech ROI Index" color="#f59e0b" /></GlassCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeader title="HMS Uptime Trend" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={uptimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[99.8, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="uptime" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Infrastructure Risk Alerts" />
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-sm">All systems operational. Last incident: 42 days ago (minor DNS).</div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-sm">Server cluster B — CPU at 78%. Scale-up recommended before month-end.</div>
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sm">ABDM: 16% patient records pending linkage. Auto-sync enabled.</div>
          </div>
        </GlassCard>
      </div>
    </DashboardPage>
  );
}
