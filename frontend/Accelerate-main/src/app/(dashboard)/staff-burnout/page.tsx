"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { DashboardPage, Card, CardHeader } from "@/components/dashboard/DashboardPage";
import { Badge } from "@/components/ui/badge";
import { HOSPITAL_DATA, calcBurnoutScore } from "@/lib/data/hospital";
import { useChartTheme, getTooltipStyle, CHART_COLORS } from "@/hooks/useChartTheme";

const burnoutTrend = [
  { week: "W1", mehta: 68, singh: 52, patel: 32, rao: 62, sharma: 28 },
  { week: "W2", mehta: 72, singh: 55, patel: 30, rao: 65, sharma: 26 },
  { week: "W3", mehta: 75, singh: 58, patel: 35, rao: 68, sharma: 30 },
  { week: "W4", mehta: 78, singh: 60, patel: 33, rao: 70, sharma: 29 },
];

const overloadGrid = [
  { dept: "Cardiology", morning: 2, evening: 3, night: 3 },
  { dept: "Orthopedics", morning: 2, evening: 2, night: 2 },
  { dept: "Emergency", morning: 3, evening: 3, night: 3 },
  { dept: "ICU", morning: 3, evening: 3, night: 3 },
  { dept: "General", morning: 1, evening: 2, night: 2 },
];

function riskLevel(score: number) {
  if (score > 70) return { label: "HIGH", variant: "danger" as const, rec: "Mandatory rest period recommended. Reassign non-critical cases." };
  if (score > 40) return { label: "MEDIUM", variant: "warning" as const, rec: "Monitor closely. Limit additional emergency shifts." };
  return { label: "LOW", variant: "success" as const, rec: "Workload within healthy range." };
}

export default function StaffBurnoutPage() {
  const chart = useChartTheme();
  const doctors = HOSPITAL_DATA.doctors.map((d) => ({ ...d, score: calcBurnoutScore(d) }));

  return (
    <DashboardPage title="Staff Burnout Prediction" subtitle="Workload scoring and department overload analysis">
      <div className="mb-4 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--muted)] inline-block">
        burnoutScore = (hours × 0.4) + (surgeries × 0.3) + (nightShifts × 0.2) + (emergency × 0.1) → 0–100
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {doctors.map((doc, i) => {
          const risk = riskLevel(doc.score);
          return (
            <Card key={doc.name} delay={i + 1}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-sm">{doc.name}</p>
                  <p className="text-xs text-[var(--muted)]">{doc.specialty}</p>
                </div>
                <Badge variant={risk.variant}>{risk.label}</Badge>
              </div>
              <div className="h-2 rounded-full bg-[var(--border)] mb-1">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${doc.score}%`,
                    background: risk.variant === "danger" ? CHART_COLORS.danger : risk.variant === "warning" ? CHART_COLORS.warning : CHART_COLORS.success,
                  }}
                />
              </div>
              <p className="text-xs text-right text-[var(--muted)] mb-3">{doc.score}/100</p>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-[var(--muted)] mb-3">
                <span>Hours: {doc.hours}/wk</span>
                <span>Surgeries: {doc.surgeries}</span>
                <span>Night shifts: {doc.nightShifts}</span>
                <span>Emergency: {doc.emergency}</span>
              </div>
              <p className="text-[11px] p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">{risk.rec}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card delay={4}>
          <CardHeader title="Burnout Trend (4 weeks)" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={burnoutTrend}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: chart.text }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: chart.text }} />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Legend />
                <Line type="monotone" dataKey="mehta" stroke={CHART_COLORS.primary} name="Dr. Mehta" dot={false} />
                <Line type="monotone" dataKey="singh" stroke={CHART_COLORS.warning} name="Dr. Singh" dot={false} />
                <Line type="monotone" dataKey="patel" stroke={CHART_COLORS.secondary} name="Dr. Patel" dot={false} />
                <Line type="monotone" dataKey="rao" stroke={CHART_COLORS.danger} name="Dr. Rao" dot={false} />
                <Line type="monotone" dataKey="sharma" stroke={CHART_COLORS.success} name="Dr. Sharma" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
        <Card delay={5}>
          <CardHeader title="Department Overload Heatmap" />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[var(--muted)]">
                <th className="text-left pb-2">Department</th>
                <th>Morning</th><th>Evening</th><th>Night</th>
              </tr>
            </thead>
            <tbody>
              {overloadGrid.map((row) => (
                <tr key={row.dept} className="border-t border-[var(--border)]">
                  <td className="py-2.5 font-medium">{row.dept}</td>
                  {(["morning", "evening", "night"] as const).map((shift) => {
                    const v = row[shift];
                    const color = v === 3 ? CHART_COLORS.danger : v === 2 ? CHART_COLORS.warning : CHART_COLORS.primary;
                    return (
                      <td key={shift} className="py-2 text-center">
                        <div className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center text-[10px] font-semibold" style={{ background: `${color}22`, color }}>
                          {v === 3 ? "High" : v === 2 ? "Med" : "Low"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </DashboardPage>
  );
}
