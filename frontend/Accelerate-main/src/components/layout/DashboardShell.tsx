"use client";

import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { FloatingChat } from "./FloatingChat";
import { useDashboard } from "@/context/DashboardContext";

export function DashboardShell({
  title,
  children,
  insights,
}: {
  title: string;
  children: React.ReactNode;
  insights?: React.ReactNode;
}) {
  const { setCurrentPageTitle } = useDashboard();

  useEffect(() => {
    setCurrentPageTitle(title);
  }, [setCurrentPageTitle, title]);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav title={title} />
        <div className="flex flex-1 min-h-0">
          <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
          {insights && (
            <aside className="hidden xl:block w-80 shrink-0 border-l border-[var(--border)] p-4 overflow-y-auto bg-[var(--card)]/50">
              {insights}
            </aside>
          )}
        </div>
      </div>
      <FloatingChat />
    </div>
  );
}
