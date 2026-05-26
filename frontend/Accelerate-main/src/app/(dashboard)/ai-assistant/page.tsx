"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles, Bot } from "lucide-react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "How many beds are available?",
  "What is ICU availability?",
  "What departments are underperforming?",
  "Predict ICU occupancy next month.",
  "Which doctors are at burnout risk?",
];

export default function AIAssistantPage() {
  const { filters, lastUpdated, currentPageTitle } = useDashboard();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome. I'm Accelerate AI, your executive intelligence copilot. Ask about revenue, occupancy, staff burnout, pharmacy, or patient sentiment.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          messages: nextMessages,
          filters,
          activePage: window.location.pathname,
          pageTitle: currentPageTitle,
          lastUpdated: lastUpdated.toISOString(),
          frontendContext: {
            pageTitle: currentPageTitle,
            path: window.location.pathname,
            filters,
            lastUpdated: lastUpdated.toISOString(),
          },
        }),
      });
      const data = await response.json();

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ||
            data.error ||
            "I could not generate an answer from the dashboard context right now.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I could not reach the chat service. Check that the Next.js server is running and Gemini is configured.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <DashboardPage title="AI CEO Assistant">
      <Card className="flex h-[calc(100vh-140px)] min-h-[500px] flex-col ring-1 ring-[var(--primary)]/10" hover={false}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Accelerate AI</h2>
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
                    Accelerate
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
              disabled={typing}
              placeholder="Ask Accelerate anything about your hospital..."
              className="flex-1 h-10 px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            />
            <Button variant="outline" size="icon" title="Voice">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={() => send(input)} disabled={typing || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </DashboardPage>
  );
}
