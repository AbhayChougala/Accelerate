"use client";

import { useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Sparkles } from "lucide-react";
import { DashboardPage, Card, CardHeader } from "@/components/dashboard/DashboardPage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSPITAL_DATA } from "@/lib/data/hospital";
import { useChartTheme, getTooltipStyle, CHART_COLORS } from "@/hooks/useChartTheme";

const complaintBars = [
  { category: "Waiting Time", pct: 42 },
  { category: "Staff Behaviour", pct: 23 },
  { category: "Billing Issues", pct: 19 },
  { category: "Cleanliness", pct: 16 },
];

interface AnalysisResult {
  sentiment: string;
  score: number;
  category: string;
  recommendation: string;
}

const sentimentVariant: Record<string, "success" | "default" | "danger" | "warning"> = {
  Positive: "success",
  Neutral: "default",
  Negative: "danger",
  Mixed: "warning",
};

export default function PatientSentimentPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const chart = useChartTheme();

  const sentimentDonut = [
    { name: "Positive", value: 68, color: CHART_COLORS.success },
    { name: "Neutral", value: 18, color: CHART_COLORS.slate },
    { name: "Negative", value: 14, color: CHART_COLORS.danger },
  ];

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setResult(await res.json());
    } catch {
      setResult({
        sentiment: "Neutral",
        score: 50,
        category: "General",
        recommendation: "Unable to analyze. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardPage title="Patient Sentiment" subtitle="AI-powered NLP and aggregate analytics">
      <Card delay={1} className="mb-4 ring-1 ring-[var(--primary)]/10">
        <CardHeader title="Analyze Patient Review" />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste a patient review to analyze..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] resize-none"
        />
        <Button onClick={analyze} disabled={loading} className="mt-3">
          <Sparkles className="h-4 w-4" />
          {loading ? "Analyzing..." : "Analyze with AI"}
        </Button>

        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {result && !loading && (
          <div className="mt-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant={sentimentVariant[result.sentiment] || "default"}>{result.sentiment}</Badge>
              <Badge variant="info">{result.category}</Badge>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--muted)]">Sentiment Score</span>
                <span>{result.score}/100</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${result.score}%`,
                    background: result.score > 60 ? CHART_COLORS.success : result.score > 40 ? CHART_COLORS.warning : CHART_COLORS.danger,
                  }}
                />
              </div>
            </div>
            <p className="text-sm"><span className="font-medium">Recommendation:</span> {result.recommendation}</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card delay={2}>
          <CardHeader title="Sentiment Distribution" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={sentimentDonut} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                  {sentimentDonut.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={getTooltipStyle(chart)} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
        <Card delay={3}>
          <CardHeader title="Complaint Categories" />
          {chart.mounted && (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={complaintBars} layout="vertical" margin={{ left: 90 }}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 50]} unit="%" tick={{ fontSize: 10, fill: chart.text }} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 10, fill: chart.text }} width={85} />
                <Tooltip contentStyle={getTooltipStyle(chart)} />
                <Bar dataKey="pct" fill={CHART_COLORS.primary} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      <Card delay={4} className="mb-4">
        <CardHeader title="Sample Reviews" subtitle="Click to analyze" />
        <div className="grid sm:grid-cols-3 gap-3">
          {HOSPITAL_DATA.reviews.map((r, i) => (
            <button
              key={i}
              onClick={() => setText(r.text)}
              className="text-left p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40 transition-colors"
            >
              <Badge variant={sentimentVariant[r.sentiment] || "default"}>{r.sentiment}</Badge>
              <p className="text-xs text-[var(--muted)] mt-2 line-clamp-3">{r.text}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card delay={5} className="ring-1 ring-[var(--primary)]/10">
        <CardHeader title="AI Root Cause Analysis" />
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Primary driver of negative sentiment: <strong className="text-[var(--foreground)]">OPD waiting time (42%)</strong>.
          Secondary: Staff communication gaps (23%).
          Recommendation: Deploy token queue system in OPD and conduct staff communication training.
        </p>
      </Card>
    </DashboardPage>
  );
}
