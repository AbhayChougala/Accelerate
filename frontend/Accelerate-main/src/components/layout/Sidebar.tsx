"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BedDouble, IndianRupee, Heart, Users, Pill, Sparkles,
  Activity, Stethoscope, Microscope, Scissors, Shield, Award, Ambulance,
  Building2, Brain, TrendingUp, Package, Server, Leaf, X, ChevronLeft,
  ChevronRight, Hospital, UserCog, MessageSquareHeart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navGroups } from "@/lib/navigation";
import { useDashboard } from "@/context/DashboardContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, BedDouble, IndianRupee, Heart, Users, Pill, Sparkles, Brain,
  Activity, Stethoscope, Microscope, Scissors, Shield, Award, Ambulance,
  Building2, TrendingUp, Package, Server, Leaf, UserCog, MessageSquareHeart,
};

function NavItemLink({
  href,
  label,
  icon,
  badge,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  label: string;
  icon: string;
  badge?: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const Icon = iconMap[icon] || LayoutDashboard;

  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        active ? "nav-item-active" : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-[var(--primary)]" : "text-[var(--muted)] group-hover:text-[var(--foreground)]")} />
      {!collapsed && (
        <>
          <span className="truncate flex-1">{label}</span>
          {badge && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-[var(--primary-light)] text-[var(--primary)]">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className={cn("flex h-[var(--navbar-height)] items-center border-b border-[var(--border)] shrink-0", collapsed ? "justify-center px-2" : "px-4 gap-3")}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-white shrink-0">
          <Hospital className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Accelerate</p>
            <p className="text-[10px] text-[var(--muted)]">Executive BI</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItemLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  active={pathname === item.href}
                  collapsed={collapsed}
                  onClick={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-[var(--border)] text-[10px] text-[var(--muted)]">
          NABH · ABDM · Ayushman Ready
        </div>
      )}
    </>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useDashboard();

  const width = sidebarCollapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)";

  const desktopSidebar = (
    <aside
      className="hidden lg:flex flex-col h-screen sticky top-0 border-r border-[var(--border)] bg-[var(--card)] transition-[width] duration-300 ease-in-out shrink-0 z-20 relative"
      style={{ width }}
    >
      <SidebarContent collapsed={sidebarCollapsed} onNavigate={() => {}} />
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-[72px] flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--primary)] shadow-sm transition-colors"
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </aside>
  );

  return (
    <>
      {desktopSidebar}
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
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden flex flex-col bg-[var(--card)] border-r border-[var(--border)] shadow-xl"
              style={{ width: "var(--sidebar-width)" }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-5 p-1.5 rounded-lg hover:bg-[var(--surface)] z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent collapsed={false} onNavigate={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
