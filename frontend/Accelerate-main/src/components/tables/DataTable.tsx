"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function DataTable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card padding={false} className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </Card>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-[var(--border)] bg-[var(--surface)]/50 text-left text-xs font-medium text-[var(--muted)] uppercase tracking-wide">
        {children}
      </tr>
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-[var(--border)]">{children}</tbody>;
}

export function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn("px-4 py-3", className)}>{children}</th>;
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cn("px-4 py-3 text-[var(--foreground)]", className)}>{children}</td>
  );
}

export function Tr({
  children,
  className,
  highlight,
}: {
  children: React.ReactNode;
  className?: string;
  highlight?: "danger" | "warning";
}) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-[var(--surface)]/80",
        highlight === "danger" && "bg-red-50/50 dark:bg-red-950/20",
        highlight === "warning" && "bg-amber-50/50 dark:bg-amber-950/20",
        className
      )}
    >
      {children}
    </tr>
  );
}
