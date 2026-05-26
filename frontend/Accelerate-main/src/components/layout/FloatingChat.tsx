"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { chatResponses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function getReply(text: string) {
  const l = text.toLowerCase();
  if (l.includes("profit") || l.includes("decline")) return chatResponses.profitability;
  if (l.includes("department")) return chatResponses.departments;
  if (l.includes("icu") || l.includes("predict")) return chatResponses.icu;
  return chatResponses.default;
}

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello. Ask me anything about hospital performance." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getReply(text) }]);
    }, 800);
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
                    <p className="text-sm font-semibold">MedMind Quick</p>
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
              </div>
              <div className="p-3 border-t border-[var(--border)] flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Quick question..."
                  className="flex-1"
                />
                <Button size="icon" onClick={() => send(input)}>
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
