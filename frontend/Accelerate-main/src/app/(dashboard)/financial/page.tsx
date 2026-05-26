"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import { DashboardPage, Card, CardHeader } from "@/components/dashboard/DashboardPage";
import { Badge } from "@/components/ui/badge";
import { DataTable, TableHead, TableBody, Th, Td, Tr } from "@/components/tables/DataTable";
import { useChartTheme, getTooltipStyle, CHART_COLORS } from "@/hooks/useChartTheme";
import { HOSPITAL_DATA } from "@/lib/data/hospital";

const { departments, pendingClaims } = HOSPITAL_DATA;

const insuranceData = [
  { name: "Approved", value: 78, color: CHART_COLORS.primary },
  { name: "Pending", value: 14, color: CHART_COLORS.warning },
  { name: "Rejected", value: 8, color: CHART_COLORS.danger },
];

const expenseMonths = [
  { month: "Jan", salaries: 2.4, equipment: 0.8, pharma: 0.48, utilities: 0.32 },
  { month: "Feb", salaries: 2.5, equipment: 0.75, pharma: 0.5, utilities: 0.33 },
  { month: "Mar", salaries: 2.52, equipment: 0.82, pharma: 0.52, utilities: 0.34 },
  { month: "Apr", salaries: 2.48, equipment: 0.78, pharma: 0.49, utilities: 0.32 },
  { month: "May", salaries: 2.55, equipment: 0.85, pharma: 0.54, utilities: 0.35 },
  { month: "Jun", salaries: 2.58, equipment: 0.88, pharma: 0.56, utilities: 0.36 },
];

function deptStatus(growth: number) {
  if (growth <= -20) return { label: "Anomaly", variant: "danger" as const };
  if (growth >= 10) return { label: "Growing", variant: "success" as const };
  return { label: "Normal", variant: "default" as const };
}

export default function FinancialPage() {
  const chart = useChartTheme();

  return (
    <DashboardPage title="Financial Analytics" subtitle="Revenue, profitability, and insurance intelligence">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card delay={1}>
          <CardHeader title="Revenue by Department" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departments}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: chart.text }} />
                <YAxis tick={{ fontSize: 10, fill: chart.text }} />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Bar dataKey="revenue" fill={CHART_COLORS.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
        <DataTable>
          <TableHead>
            <Th>Department</Th><Th>Revenue</Th><Th>Growth</Th><Th>Status</Th>
          </TableHead>
          <TableBody>
            {departments.map((d) => {
              const st = deptStatus(d.growth);
              return (
                <Tr key={d.name} highlight={d.growth <= -20 ? "danger" : undefined}>
                  <Td className="font-medium">{d.name}</Td>
                  <Td>₹{d.revenue}Cr</Td>
                  <Td className={d.growth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
                    {d.growth > 0 ? "+" : ""}{d.growth}%
                  </Td>
                  <Td><Badge variant={st.variant}>{st.label}</Badge></Td>
                </Tr>
              );
            })}
          </TableBody>
        </DataTable>
      </div>

      <Card delay={3} className="mb-4 ring-1 ring-[var(--danger)]/20 border-[var(--danger)]/20">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-[var(--danger)] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-[var(--danger)]">Revenue Anomaly — Radiology</h3>
            <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
              Revenue dropped ₹21.6L (27%) vs previous month. Possible causes: equipment downtime, reduced referrals, billing errors.
              <span className="text-[var(--foreground)] font-medium"> Recommended: Audit Radiology billing logs.</span>
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card delay={4}>
          <CardHeader title="Insurance Claims" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={insuranceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {insuranceData.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Legend />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
        <DataTable>
          <TableHead>
            <Th>Patient</Th><Th>Amount</Th><Th>Days</Th><Th>Risk</Th>
          </TableHead>
          <TableBody>
            {pendingClaims.map((c) => (
              <Tr key={c.patient}>
                <Td>{c.patient}</Td>
                <Td>{c.amount}</Td>
                <Td>{c.days}</Td>
                <Td>
                  <Badge variant={c.risk === "High" ? "danger" : c.risk === "Med" ? "warning" : "success"}>
                    {c.risk}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </TableBody>
        </DataTable>
      </div>

      <Card delay={6}>
        <CardHeader title="Expense Breakdown" subtitle="6 months · stacked" />
        {chart.mounted && (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={expenseMonths}>
              <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: chart.text }} />
              <YAxis tick={{ fontSize: 10, fill: chart.text }} />
              <Tooltip contentStyle={getTooltipStyle(chart)} />
              <Legend />
              <Bar dataKey="salaries" stackId="a" fill={CHART_COLORS.primary} name="Salaries" />
              <Bar dataKey="equipment" stackId="a" fill={CHART_COLORS.primaryLight} name="Equipment" />
              <Bar dataKey="pharma" stackId="a" fill={CHART_COLORS.warning} name="Pharma" />
              <Bar dataKey="utilities" stackId="a" fill={CHART_COLORS.slate} name="Utilities" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </DashboardPage>
  );
}
