"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const priorityStyles = {
  high: { badge: "danger" as const, icon: AlertTriangle },
  medium: { badge: "warning" as const, icon: Info },
  low: { badge: "info" as const, icon: TrendingUp },
};

export function InsightCard({
  title,
  description,
  priority = "medium",
  impact,
  className,
}: {
  title: string;
  description: string;
  priority?: "high" | "medium" | "low";
  impact?: string;
  className?: string;
}) {
  const { badge, icon: Icon } = priorityStyles[priority];
  return (
    <Card className={cn("p-4", className)} hover={false}>
      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] dark:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]">
          <Icon className="h-4 w-4 text-[var(--primary)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-[var(--foreground)]">{title}</p>
            <Badge variant={badge}>{priority}</Badge>
          </div>
          <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{description}</p>
          {impact && (
            <p className="text-xs font-medium text-[var(--primary)] mt-2">{impact}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function InsightPanel({
  insights,
  title = "AI Insights",
}: {
  insights: { title: string; description: string; priority?: "high" | "medium" | "low"; impact?: string }[];
  title?: string;
}) {
  return (
    <Card className="ring-1 ring-[var(--primary)]/10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-[var(--primary)]" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <InsightCard key={i} {...insight} className="!shadow-none border border-[var(--border)]" />
        ))}
      </div>
    </Card>
  );
}
