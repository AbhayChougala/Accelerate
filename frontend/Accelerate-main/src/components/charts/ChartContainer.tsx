"use client";

import { cn } from "@/lib/utils";
import { Card, CardHeader } from "./card";

export function ChartContainer({
  title,
  subtitle,
  action,
  children,
  height = 260,
  className,
  delay = 0,
}: {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  height?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <Card delay={delay} className={className}>
      {title && <CardHeader title={title} subtitle={subtitle} action={action} />}
      <div className={cn("w-full", !title && "pt-0")} style={{ height }}>
        {children}
      </div>
    </Card>
  );
}
