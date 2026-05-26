"use client";

import { cn } from "@/lib/utils";

interface HeatmapRow {
  dept: string;
  [key: string]: string | number;
}

const hours = ["h8", "h10", "h12", "h14", "h16"];
const hourLabels = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"];

function getColor(val: number) {
  if (val >= 90) return "bg-red-500 text-white";
  if (val >= 75) return "bg-orange-400 text-white";
  if (val >= 60) return "bg-amber-400 text-slate-900";
  if (val >= 45) return "bg-emerald-300 text-slate-900";
  return "bg-emerald-100 text-slate-700 dark:bg-emerald-900/40 dark:text-emerald-100";
}

export function HeatmapGrid({ data }: { data: HeatmapRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[400px]">
        <div className="grid grid-cols-6 gap-1 mb-1">
          <div />
          {hourLabels.map((h) => (
            <div key={h} className="text-xs text-center text-[var(--muted)] font-medium py-1">
              {h}
            </div>
          ))}
        </div>
        {data.map((row) => (
          <div key={row.dept} className="grid grid-cols-6 gap-1 mb-1">
            <div className="text-xs font-medium py-2 pr-2 truncate">{row.dept}</div>
            {hours.map((h) => {
              const val = row[h] as number;
              return (
                <div
                  key={h}
                  title={`${row.dept} @ ${h}: ${val}% congestion`}
                  className={cn(
                    "heatmap-cell rounded-lg text-xs font-semibold flex items-center justify-center h-10",
                    getColor(val)
                  )}
                >
                  {val}%
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-[var(--muted)]">
        <span>Low</span>
        <div className="flex gap-0.5">
          {["bg-emerald-100", "bg-emerald-300", "bg-amber-400", "bg-orange-400", "bg-red-500"].map(
            (c) => (
              <div key={c} className={cn("w-6 h-3 rounded", c)} />
            )
          )}
        </div>
        <span>High congestion</span>
      </div>
    </div>
  );
}
