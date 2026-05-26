"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  IndianRupee,
  Activity,
  BedDouble,
  Stethoscope,
  Users,
  Heart,
  Microscope,
  Pill,
  Scissors,
  Shield,
  Award,
  Ambulance,
  Building2,
  Brain,
  TrendingUp,
  Package,
  Server,
  Leaf,
  X,
  Hospital,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/navigation";
import { HOSPITAL_NAME } from "@/lib/data";
import { useDashboard } from "@/context/DashboardContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  IndianRupee,
  Activity,
  BedDouble,
  Stethoscope,
  Users,
  Heart,
  Microscope,
  Pill,
  Scissors,
  Shield,
  Award,
  Ambulance,
  Building2,
  Brain,
  TrendingUp,
  Package,
  Server,
  Leaf,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  const content = (
    <aside className="flex flex-col h-full bg-[var(--sidebar)] border-r border-slate-200/80 dark:border-slate-800">
      <div className="p-5 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-header flex items-center justify-center">
            <Hospital className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">MedVista</p>
            <p className="text-xs text-[var(--muted)] truncate">Executive BI</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                  : "text-[var(--muted)] hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[var(--foreground)]"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active && "text-sky-500")} />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800">
        <p className="text-xs text-[var(--muted)]">{HOSPITAL_NAME}</p>
        <p className="text-xs text-[var(--muted)] mt-1">NABH · ABDM · Ayushman Ready</p>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0">{content}</div>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-5 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
