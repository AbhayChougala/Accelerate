"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles, Bot } from "lucide-react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { chatResponses } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Why did profitability decline this week?",
  "What departments are underperforming?",
  "Predict ICU occupancy next month.",
  "Which doctors are at burnout risk?",
  "Should we expand ICU capacity?",
];

function getAIResponse(input: string): string {
  const l = input.toLowerCase();
  if (l.includes("profit") || l.includes("decline")) return chatResponses.profitability;
  if (l.includes("department") || l.includes("underperform")) return chatResponses.departments;
  if (l.includes("icu") || l.includes("occupancy") || l.includes("predict")) return chatResponses.icu;
  if (l.includes("burnout") || l.includes("doctor") || l.includes("staff"))
    return "Dr. Mehta (score 78) and Dr. Rao (score 70) are at HIGH burnout risk. Recommend mandatory rest and shift redistribution.";
  if (l.includes("expand") || l.includes("capacity"))
    return "Based on 7-day AI forecast, ICU will hit 93% on Day 5. Recommend adding 4-6 ICU beds at Mumbai Central.";
  return chatResponses.default;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome. I'm MedMind AI, your executive intelligence copilot. Ask about revenue, occupancy, staff burnout, pharmacy, or patient sentiment.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: getAIResponse(text) }]);
      setTyping(false);
    }, 1400);
  };

  return (
    <DashboardPage title="AI CEO Assistant">
      <Card className="flex flex-col ring-1 ring-[var(--primary)]/10" style={{ height: "calc(100vh - 140px)", minHeight: 500 }} hover={false}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">MedMind AI</h2>
              <p className="text-xs text-[var(--muted)]">Your Executive Intelligence Copilot</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="live-indicator h-2 w-2 rounded-full bg-emerald-500" />
            Live
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] lg:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--primary-light)] text-[var(--primary)] dark:bg-[color-mix(in_srgb,var(--primary)_18%,transparent)] rounded-br-md"
                    : "bg-[var(--surface)] border border-[var(--border)] rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" && (
                  <span className="text-[10px] font-semibold text-[var(--primary)] uppercase tracking-wide block mb-1">
                    MedMind
                  </span>
                )}
                {msg.content}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2 items-center text-sm text-[var(--muted)]">
              <Bot className="h-4 w-4" />
              Analyzing hospital data...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-[var(--border)] shrink-0">
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask MedMind anything about your hospital..."
              className="flex-1 h-10 px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            />
            <Button variant="outline" size="icon" title="Voice">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={() => send(input)}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </DashboardPage>
  );
}
