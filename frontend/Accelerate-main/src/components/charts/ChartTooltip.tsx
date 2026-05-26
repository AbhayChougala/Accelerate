"use client";

export function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label && <p className="font-medium mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="text-[var(--muted)]" style={{ color: p.color }}>
          {p.name}: <span className="font-semibold text-[var(--foreground)]">{p.value}</span>
        </p>
      ))}
    </div>
  );
}
