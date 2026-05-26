"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboard } from "@/context/DashboardContext";

type Message = { role: "user" | "bot"; text: string };

export function FloatingChat() {
  const { filters, lastUpdated, currentPageTitle } = useDashboard();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello. Ask me anything about hospital performance." },
  ]);

  const send = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          messages: nextMessages.map((message) => ({
            role: message.role === "bot" ? "assistant" : "user",
            content: message.text,
          })),
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
          role: "bot",
          text:
            data.reply ||
            data.error ||
            "I could not generate an answer from the dashboard context right now.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text:
            "I could not reach the chat service. Check that the Next.js server is running and Gemini is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-hover)] transition-colors"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open AI assistant"
      >
        <Bot className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] dashboard-card flex flex-col overflow-hidden shadow-xl"
              style={{ maxHeight: "480px" }}
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                    <Bot className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Accelerate Quick</p>
                    <p className="text-[10px] text-[var(--muted)]">Executive assistant</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-[var(--surface)]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px] max-h-[300px]">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`text-sm p-2.5 rounded-xl max-w-[90%] ${
                      m.role === "user"
                        ? "ml-auto bg-[var(--primary-light)] text-[var(--primary)] dark:bg-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
                        : "bg-[var(--surface)] text-[var(--foreground)]"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && (
                  <div className="text-sm p-2.5 rounded-xl max-w-[90%] bg-[var(--surface)] text-[var(--foreground)]">
                    Analyzing hospital data...
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-[var(--border)] flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  disabled={loading}
                  placeholder="Quick question..."
                  className="flex-1"
                />
                <Button size="icon" onClick={() => send(input)} disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
