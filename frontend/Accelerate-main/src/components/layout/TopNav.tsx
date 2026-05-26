"use client";

import {
  Bell, Menu, Download, ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useDashboard } from "@/context/DashboardContext";
import { BRANCHES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function TopNav({ title }: { title: string }) {
  const {
    filters,
    setFilters,
    setSidebarOpen,
    notificationsOpen,
    setNotificationsOpen,
    lastUpdated,
  } = useDashboard();

  return (
    <header className="sticky top-0 z-30 navbar-blur h-[var(--navbar-height)]">
      <div className="flex h-full items-center gap-3 px-4 lg:px-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--surface)] text-[var(--muted)]"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold tracking-tight truncate">{title}</h1>
          <p className="text-[11px] text-[var(--muted)] flex items-center gap-1.5">
            <span className="live-indicator h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live · {lastUpdated.toLocaleTimeString("en-IN")}
          </p>
        </div>

        <div className="hidden md:block w-48 lg:w-56">
          <Input icon placeholder="Search metrics..." className="h-9" />
        </div>

        <select
          value={filters.branch}
          onChange={(e) => setFilters({ branch: e.target.value })}
          className="hidden sm:block h-9 text-xs rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 max-w-[130px]"
        >
          {BRANCHES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <Button variant="ghost" size="icon" title="Export">
          <Download className="h-4 w-4" />
        </Button>

        <ThemeToggle />

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell className="h-4 w-4" />
          </Button>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--danger)] ring-2 ring-[var(--card)]" />
          <AnimatePresence>
            {notificationsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 p-3"
                >
                  <p className="text-sm font-semibold mb-2">Notifications</p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
                      <p className="font-medium text-red-700 dark:text-red-400">ICU capacity critical</p>
                      <p className="text-[var(--muted)] mt-0.5">Mumbai Central at 96%</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                      <p className="font-medium text-amber-700 dark:text-amber-400">Pharmacy stock low</p>
                      <p className="text-[var(--muted)] mt-0.5">Azithromycin below threshold</p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] pl-1 pr-2 py-1 hover:bg-[var(--surface)] transition-colors">
          <div className="h-7 w-7 rounded-md bg-[var(--primary)] flex items-center justify-center text-[10px] font-bold text-white">
            CEO
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-[var(--muted)] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
