"use client";

import { AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Alert } from "@/lib/types";

const icons = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  critical: "border-red-200 bg-red-50/80 dark:border-red-900/50 dark:bg-red-950/30",
  warning: "border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/30",
  info: "border-sky-200 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/30",
};

const iconColors = {
  critical: "text-red-500",
  warning: "text-amber-500",
  info: "text-sky-500",
};

export function AlertPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
      {alerts.map((alert) => {
        const Icon = icons[alert.severity];
        return (
          <div
            key={alert.id}
            className={cn(
              "flex gap-3 p-3 rounded-xl border transition-colors hover:shadow-sm",
              styles[alert.severity]
            )}
          >
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconColors[alert.severity])} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm">{alert.title}</p>
                <span className="text-xs text-[var(--muted)] whitespace-nowrap">{alert.time}</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-0.5">{alert.message}</p>
              {alert.department && (
                <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-white/60 dark:bg-slate-800/60">
                  {alert.department}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
