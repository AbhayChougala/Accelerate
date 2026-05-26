"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AI_INSIGHTS } from "@/lib/data/hospital";

export function CyclingInsights() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % AI_INSIGHTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <Card className="ring-1 ring-[var(--primary)]/15">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-[var(--primary)]" />
        <h3 className="text-sm font-semibold">MedMind AI Insights</h3>
      </div>
      <p key={idx} className="text-sm text-[var(--muted)] leading-relaxed insight-fade">
        {AI_INSIGHTS[idx]}
      </p>
      <div className="flex gap-1 mt-4">
        {AI_INSIGHTS.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all"
            style={{
              width: i === idx ? 20 : 6,
              background: i === idx ? "var(--primary)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </Card>
  );
}
