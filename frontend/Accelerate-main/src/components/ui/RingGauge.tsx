"use client";

export function RingGauge({
  value,
  max,
  label,
  color,
  size = 120,
}: {
  value: number;
  max: number;
  label: string;
  color: string;
  size?: number;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={8}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-2xl font-bold" style={{ color }}>
          {value}
        </span>
        <span className="text-[10px] text-[var(--muted)]">/ {max}</span>
      </div>
      </div>
      <p className="text-xs text-[var(--muted)] mt-2 text-center">{label}</p>
    </div>
  );
}
