"use client";

import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { AIChat } from "./AIChat";

export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav title={title} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
      <AIChat />
    </div>
  );
}
