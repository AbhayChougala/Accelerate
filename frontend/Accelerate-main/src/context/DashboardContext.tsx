"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { FilterState } from "@/lib/types";

interface DashboardContextType {
  filters: FilterState;
  setFilters: (f: Partial<FilterState>) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  lastUpdated: Date;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<FilterState>({
    dateRange: "MTD",
    branch: "All Branches",
    department: "All Departments",
    doctor: "All Doctors",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem("medmind-sidebar-collapsed");
    if (saved === "true") setSidebarCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("medmind-sidebar-collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const setFilters = (f: Partial<FilterState>) =>
    setFiltersState((prev) => ({ ...prev, ...f }));

  return (
    <DashboardContext.Provider
      value={{
        filters,
        setFilters,
        sidebarOpen,
        setSidebarOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
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
