"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { FilterState, ThemeMode } from "@/lib/types";

interface DashboardContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  filters: FilterState;
  setFilters: (f: Partial<FilterState>) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  lastUpdated: Date;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [filters, setFiltersState] = useState<FilterState>({
    dateRange: "MTD",
    branch: "All Branches",
    department: "All Departments",
    doctor: "All Doctors",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem("medvista-theme") as ThemeMode | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("medvista-theme", theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const setFilters = (f: Partial<FilterState>) =>
    setFiltersState((prev) => ({ ...prev, ...f }));

  return (
    <DashboardContext.Provider
      value={{
        theme,
        toggleTheme,
        filters,
        setFilters,
        sidebarOpen,
        setSidebarOpen,
        chatOpen,
        setChatOpen,
        notificationsOpen,
        setNotificationsOpen,
        lastUpdated,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
