"use client";

import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  Download,
  Sparkles,
  Mic,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { BRANCHES, DEPARTMENTS, DOCTORS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { criticalAlerts } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export function TopNav({ title }: { title: string }) {
  const {
    theme,
    toggleTheme,
    filters,
    setFilters,
    setSidebarOpen,
    setChatOpen,
    setNotificationsOpen,
    notificationsOpen,
    lastUpdated,
  } = useDashboard();

  const criticalCount = criticalAlerts.filter((a) => a.severity === "critical").length;

  return (
    <header className="sticky top-0 z-30 glass-card !rounded-none border-x-0 border-t-0 px-4 lg:px-6 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg font-bold truncate">{title}</h1>
            <p className="text-xs text-[var(--muted)] flex items-center gap-1.5">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Live · Updated {lastUpdated.toLocaleTimeString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[140px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
            <input
              type="search"
              placeholder="Search metrics, doctors..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>

          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ dateRange: e.target.value })}
            className="text-xs py-2 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80"
          >
            {["Today", "WTD", "MTD", "QTD", "YTD"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <select
            value={filters.branch}
            onChange={(e) => setFilters({ branch: e.target.value })}
            className="text-xs py-2 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 max-w-[120px]"
          >
            {BRANCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            value={filters.department}
            onChange={(e) => setFilters({ department: e.target.value })}
            className="hidden md:block text-xs py-2 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 max-w-[130px]"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            value={filters.doctor}
            onChange={(e) => setFilters({ doctor: e.target.value })}
            className="hidden xl:block text-xs py-2 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 max-w-[120px]"
          >
            {DOCTORS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <button
            title="Export"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Bell className="h-4 w-4" />
              {criticalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center">
                  {criticalCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto glass-card z-50 p-3"
                  >
                    <p className="font-semibold text-sm mb-2">Smart Alerts</p>
                    {criticalAlerts.slice(0, 4).map((a) => (
                      <div
                        key={a.id}
                        className={cn(
                          "p-2 rounded-lg mb-2 text-xs",
                          a.severity === "critical" && "bg-red-50 dark:bg-red-950/30",
                          a.severity === "warning" && "bg-amber-50 dark:bg-amber-950/30"
                        )}
                      >
                        <p className="font-medium">{a.title}</p>
                        <p className="text-[var(--muted)] mt-0.5">{a.message}</p>
                      </div>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl gradient-header text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          <button
            title="Voice analytics"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
