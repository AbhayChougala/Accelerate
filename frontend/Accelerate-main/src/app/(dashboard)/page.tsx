"use client";

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  IndianRupee, TrendingUp, BedDouble, Building2, Users, Star,
  Shield, Siren,
} from "lucide-react";
import { DashboardPage, Card, CardHeader } from "@/components/dashboard/DashboardPage";
import { ExecutiveKpi } from "@/components/ui/ExecutiveKpi";
import { CyclingInsights } from "@/components/insights/CyclingInsights";
import { Badge } from "@/components/ui/badge";
import { useChartTheme, getTooltipStyle, CHART_COLORS } from "@/hooks/useChartTheme";
import {
  HOSPITAL_DATA, BED_OCCUPANCY_30, EMERGENCY_WEEKLY, SMART_ALERTS,
} from "@/lib/data/hospital";
import { revenueTrend, topDepartments } from "@/lib/data";

const { kpis } = HOSPITAL_DATA;

export default function ExecutiveDashboard() {
  const chart = useChartTheme();

  return (
    <DashboardPage
      title="Executive Dashboard"
      subtitle="Real-time hospital network intelligence"
      insights={<CyclingInsights />}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ExecutiveKpi icon={IndianRupee} label="Revenue (MTD)" value={kpis.revenue} delta={kpis.revenueDelta} delay={1} />
        <ExecutiveKpi icon={TrendingUp} label="Net Profit" value={kpis.netProfit} delta={kpis.profitDelta} delay={2} />
        <ExecutiveKpi icon={BedDouble} label="ICU Occupancy" value={`${kpis.icuOccupancy}%`} critical={kpis.icuOccupancy > 85} delay={3} />
        <ExecutiveKpi icon={Building2} label="Bed Occupancy" value={`${kpis.bedOccupancy}%`} delay={4} />
        <ExecutiveKpi icon={Users} label="OPD Today" value={kpis.opdCount.toLocaleString("en-IN")} delta={8} delay={5} />
        <ExecutiveKpi icon={Star} label="Satisfaction" value={`${kpis.satisfaction}/5`} delta={3} delay={6} />
        <ExecutiveKpi icon={Shield} label="Insurance Approval" value={`${kpis.insuranceApproval}%`} delta={-2} delay={7} />
        <ExecutiveKpi icon={Siren} label="Emergency Cases" value={kpis.emergencyCases} delta={12} delay={8} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card delay={2}>
          <CardHeader title="Revenue Trend" subtitle="30 days · ₹ Crores" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenueTrend}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: chart.text }} />
                <YAxis tick={{ fontSize: 10, fill: chart.text }} />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Line type="monotone" dataKey="revenue" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
        <Card delay={3}>
          <CardHeader title="Department Performance" subtitle="Revenue · ₹ Cr" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={topDepartments} layout="vertical" margin={{ left: 72 }}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10, fill: chart.text }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: chart.text }} width={68} />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Bar dataKey="revenue" fill={CHART_COLORS.primary} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 xl:hidden">
        <CyclingInsights />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card delay={4}>
          <CardHeader title="Bed Occupancy" subtitle="30-day trend" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={BED_OCCUPANCY_30}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: chart.text }} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: chart.text }} domain={[60, 100]} />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Area type="monotone" dataKey="occupancy" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.12} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>
        <Card delay={5}>
          <CardHeader title="Emergency Cases" subtitle="Last 8 weeks" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={EMERGENCY_WEEKLY}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: chart.text }} />
                <YAxis tick={{ fontSize: 10, fill: chart.text }} />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Bar dataKey="cases" fill={CHART_COLORS.warning} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {SMART_ALERTS.map((a) => (
          <div
            key={a.label}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-medium shadow-sm"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${a.severity === "critical" ? "bg-[var(--danger)]" : "bg-[var(--warning)]"}`}
            />
            <span>{a.label}</span>
            <Badge variant={a.severity === "critical" ? "danger" : "warning"}>
              {a.severity}
            </Badge>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}
