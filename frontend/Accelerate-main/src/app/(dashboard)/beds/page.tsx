"use client";

import { RingGauge } from "@/components/ui/RingGauge";
import { DashboardPage, Card, CardHeader } from "@/components/dashboard/DashboardPage";
import { Badge } from "@/components/ui/badge";
import { useChartTheme, getTooltipStyle, CHART_COLORS } from "@/hooks/useChartTheme";
import { bedAvailability, ventilatorAvailability } from "@/lib/data";
import {
  ComposedChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine, ReferenceArea, Legend,
} from "recharts";

const forecastData = [
  { day: "D-6", historical: 78, predicted: null },
  { day: "D-5", historical: 82, predicted: null },
  { day: "D-4", historical: 85, predicted: null },
  { day: "D-3", historical: 84, predicted: null },
  { day: "D-2", historical: 86, predicted: null },
  { day: "D-1", historical: 87, predicted: null },
  { day: "Today", historical: 87, predicted: 87 },
  { day: "D+1", historical: null, predicted: 88 },
  { day: "D+2", historical: null, predicted: 89 },
  { day: "D+3", historical: null, predicted: 91 },
  { day: "D+4", historical: null, predicted: 93 },
  { day: "D+5", historical: null, predicted: 92 },
  { day: "D+6", historical: null, predicted: 90 },
  { day: "D+7", historical: null, predicted: 88 },
];

function WardHeatmap() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {bedAvailability.wards.map((ward) => {
          const occupancy = Math.round((ward.occupied / ward.total) * 100);
          const status = occupancy >= 90 ? "critical" : occupancy >= 75 ? "occupied" : "available";
          const colors = {
            available: CHART_COLORS.primary,
            occupied: CHART_COLORS.warning,
            critical: CHART_COLORS.danger,
          };

          return (
          <div
            key={ward.ward}
            title={`${ward.ward}: ${ward.available}/${ward.total} available`}
            className="rounded-lg p-2 text-xs text-white cursor-pointer hover:ring-2 hover:ring-[var(--primary)]/30 transition-all"
            style={{ background: colors[status], opacity: status === "available" ? 0.72 : 1 }}
          >
            <p className="font-semibold truncate">{ward.ward}</p>
            <p className="mt-1">{ward.occupied}/{ward.total}</p>
            <p className="text-[10px] opacity-85">{ward.available} available</p>
          </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[var(--primary)]" /> Below 75%</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[var(--warning)]" /> 75-89%</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[var(--danger)]" /> 90%+</span>
      </div>
    </div>
  );
}

export default function BedsPage() {
  const chart = useChartTheme();

  return (
    <DashboardPage title="Bed & ICU Prediction" subtitle="Live occupancy and AI 7-day forecast">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="flex justify-center py-6" delay={1}>
          <RingGauge value={bedAvailability.icu.occupiedBeds} max={bedAvailability.icu.totalBeds} label="ICU Beds" color={CHART_COLORS.danger} />
        </Card>
        <Card className="flex justify-center py-6" delay={2}>
          <RingGauge value={bedAvailability.general.occupiedBeds} max={bedAvailability.general.totalBeds} label="General Ward" color={CHART_COLORS.warning} />
        </Card>
        <Card className="flex justify-center py-6" delay={3}>
          <RingGauge value={ventilatorAvailability.available} max={ventilatorAvailability.total} label="Ventilators Available" color={CHART_COLORS.primary} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card delay={4}>
          <CardHeader title="Live Ward Occupancy Heatmap" />
          <WardHeatmap />
        </Card>
        <Card delay={5}>
          <CardHeader title="AI 7-Day ICU Forecast" subtitle="Critical zone above 90%" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={forecastData}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <ReferenceArea y1={90} y2={100} fill={CHART_COLORS.danger} fillOpacity={0.08} />
                <ReferenceLine y={90} stroke={CHART_COLORS.danger} strokeDasharray="4 4" label={{ value: "Critical", fill: CHART_COLORS.danger, fontSize: 10 }} />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: chart.text }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: chart.text }} unit="%" />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Legend />
                <Line type="monotone" dataKey="historical" stroke={CHART_COLORS.primary} strokeWidth={2} name="Historical" connectNulls={false} dot />
                <Line type="monotone" dataKey="predicted" stroke={CHART_COLORS.warning} strokeWidth={2} strokeDasharray="6 4" name="AI Predicted" connectNulls={false} dot />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: "Day 5 forecast: 93% ICU", desc: "Activate overflow protocol", variant: "warning" as const },
          { title: "Weekend surge expected", desc: "Add 2 ICU standby staff", variant: "warning" as const },
          { title: "Ventilator supply", desc: "Adequate for next 7 days", variant: "success" as const },
        ].map((item) => (
          <Card key={item.title} delay={6}>
            <Badge variant={item.variant} className="mb-2">{item.variant}</Badge>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{item.desc}</p>
          </Card>
        ))}
      </div>
    </DashboardPage>
  );
}
