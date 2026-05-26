"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot, User } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "How many beds are available?",
  "What is ICU availability?",
  "Which departments are underperforming?",
];

export function AIChat() {
  const { chatOpen, setChatOpen, filters, lastUpdated } = useDashboard();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm MedVista AI, your executive analytics assistant. Ask me about hospital performance, predictions, or strategic insights.",
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
          lastUpdated: lastUpdated.toISOString(),
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
    <AnimatePresence>
      {chatOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setChatOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 glass-card !rounded-none flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl gradient-header flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">MedVista AI</p>
                  <p className="text-xs text-[var(--muted)]">Executive Intelligence</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-sky-500 text-white"
                        : "bg-violet-100 dark:bg-violet-900/40 text-violet-600"
                    }`}
                  >
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-sky-500 text-white rounded-br-md"
                        : "bg-slate-100 dark:bg-slate-800 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-violet-600" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm">
                    <span className="animate-pulse">Analyzing hospital data...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  disabled={typing}
                  placeholder="Ask anything about hospital performance..."
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
                <button
                  onClick={() => send(input)}
                  disabled={typing || !input.trim()}
                  className="p-2 rounded-xl gradient-header text-white"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
