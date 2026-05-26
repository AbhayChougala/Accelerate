"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from "recharts";
import { Package, AlertCircle, CheckCircle2, Boxes, TrendingUp, TrendingDown } from "lucide-react";
import { DashboardPage, Card, CardHeader } from "@/components/dashboard/DashboardPage";
import { Badge } from "@/components/ui/badge";
import { DataTable, TableHead, TableBody, Th, Td, Tr } from "@/components/tables/DataTable";
import { useChartTheme, getTooltipStyle, CHART_COLORS } from "@/hooks/useChartTheme";
import { HOSPITAL_DATA } from "@/lib/data/hospital";
import { KpiCard } from "@/components/ui/KpiCard";

function getStatus(days: number) {
  if (days < 10) return { label: "Critical", variant: "danger" as const, action: "Order Now" };
  if (days < 20) return { label: "Low", variant: "warning" as const, action: "Schedule Order" };
  return { label: "OK", variant: "success" as const, action: "Monitor" };
}

const forecastData = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  amoxicillin: 40 + i * 3 + (i > 7 ? 8 : 0),
  metformin: 35 + i * 0.5,
  pantoprazole: 28 + i * 2.5,
  azithromycin: 20 + i * 4,
}));

export default function PharmacyPage() {
  const chart = useChartTheme();
  const items = HOSPITAL_DATA.pharmacy.map((p) => {
    const daysRemaining = Math.floor(p.stock / p.dailyUsage);
    return { ...p, daysRemaining, status: getStatus(daysRemaining) };
  });
  const critical = items.filter((i) => i.daysRemaining < 10).length;
  const expiring = items.filter((i) => new Date(i.expiry) < new Date("2025-08-01")).length;
  const healthy = items.filter((i) => i.daysRemaining >= 20).length;

  return (
    <DashboardPage title="Pharmacy Forecast" subtitle="Inventory intelligence and AI reorder recommendations">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Critical Stock" value={critical} icon={AlertCircle} index={0} />
        <KpiCard label="Expiring Soon" value={expiring} icon={Package} index={1} />
        <KpiCard label="Healthy Stock" value={healthy} icon={CheckCircle2} index={2} />
        <KpiCard label="Total SKUs" value={6} icon={Boxes} index={3} />
      </div>

      <DataTable className="mb-4">
        <TableHead>
          <Th>Drug</Th><Th>Stock</Th><Th>Daily Use</Th><Th>Days Left</Th><Th>Expiry</Th><Th>Trend</Th><Th>Status</Th><Th>Action</Th>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <Tr key={item.drug} highlight={item.daysRemaining < 10 ? "danger" : undefined}>
              <Td className="font-medium">{item.drug}</Td>
              <Td>{item.stock}</Td>
              <Td>{item.dailyUsage}</Td>
              <Td className={item.daysRemaining < 10 ? "text-[var(--danger)] font-semibold" : ""}>{item.daysRemaining}</Td>
              <Td className="text-xs">{item.expiry}</Td>
              <Td>
                <span className={`inline-flex items-center gap-0.5 text-xs ${item.trend >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {item.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {item.trend > 0 ? "+" : ""}{item.trend}%
                </span>
              </Td>
              <Td><Badge variant={item.status.variant}>{item.status.label}</Badge></Td>
              <Td><Badge variant="info">{item.status.action}</Badge></Td>
            </Tr>
          ))}
        </TableBody>
      </DataTable>

      <Card delay={4} className="mb-4">
        <CardHeader title="14-Day Demand Forecast" />
        {chart.mounted && (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={forecastData}>
              <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: chart.text }} />
              <YAxis tick={{ fontSize: 10, fill: chart.text }} />
              <Tooltip contentStyle={getTooltipStyle(chart)} />
              <Legend />
              <ReferenceLine y={30} stroke={CHART_COLORS.danger} strokeDasharray="3 3" />
              <Line type="monotone" dataKey="amoxicillin" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="metformin" stroke={CHART_COLORS.secondary} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="pantoprazole" stroke={CHART_COLORS.warning} strokeWidth={2} dot={false} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="azithromycin" stroke={CHART_COLORS.danger} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: "Azithromycin", desc: "Order 200 units immediately. 15 units left, 35% demand surge predicted.", variant: "danger" as const },
          { title: "Pantoprazole", desc: "Schedule order within 3 days. Expiry risk on Jun 28.", variant: "warning" as const },
          { title: "Amoxicillin", desc: "Increase standing order by 22% — seasonal spike expected.", variant: "info" as const },
        ].map((rec) => (
          <Card key={rec.title}>
            <Badge variant={rec.variant} className="mb-2">{rec.variant}</Badge>
            <p className="text-sm font-medium">{rec.title}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{rec.desc}</p>
          </Card>
        ))}
      </div>
    </DashboardPage>
  );
}
