import type { NavItem } from "./types";

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: "Executive",
    items: [
      { href: "/", label: "Executive Dashboard", icon: "LayoutDashboard" },
      { href: "/ai-assistant", label: "AI CEO Assistant", icon: "Sparkles", badge: "AI" },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/beds", label: "Bed & ICU Prediction", icon: "BedDouble" },
      { href: "/operations", label: "Hospital Operations", icon: "Activity" },
      { href: "/emergency", label: "Emergency & Ambulance", icon: "Ambulance" },
      { href: "/ot", label: "Operating Theatre", icon: "Scissors" },
    ],
  },
  {
    title: "Finance",
    items: [
      { href: "/financial", label: "Financial Analytics", icon: "IndianRupee" },
      { href: "/insurance", label: "Insurance & Claims", icon: "Shield" },
      { href: "/procurement", label: "Procurement", icon: "Package" },
      { href: "/branches", label: "Multi-Branch", icon: "Building2" },
    ],
  },
  {
    title: "Clinical",
    items: [
      { href: "/doctors", label: "Doctor Performance", icon: "Stethoscope" },
      { href: "/staff-burnout", label: "Staff Burnout", icon: "UserCog" },
      { href: "/hr", label: "Staff & HR", icon: "Users" },
      { href: "/patient-sentiment", label: "Patient Sentiment", icon: "MessageSquareHeart" },
      { href: "/patient-experience", label: "Patient Experience", icon: "Heart" },
      { href: "/clinical-quality", label: "Clinical Quality", icon: "Award" },
      { href: "/diagnostics", label: "Diagnostics & Lab", icon: "Microscope" },
      { href: "/pharmacy", label: "Pharmacy Forecast", icon: "Pill" },
    ],
  },
  {
    title: "AI & Predictive",
    items: [
      { href: "/ai-predictive", label: "AI Predictive", icon: "Brain" },
      { href: "/strategic-growth", label: "Strategic Growth", icon: "TrendingUp" },
      { href: "/digital", label: "Digital Infrastructure", icon: "Server" },
      { href: "/esg", label: "Sustainability & ESG", icon: "Leaf" },
    ],
  },
];

export const navItems = navGroups.flatMap((g) => g.items);

export const mainNavItems = navGroups[0].items.concat(
  navGroups[1].items.slice(0, 1),
  navGroups[2].items.slice(0, 1),
  navGroups[3].items.slice(1, 3),
  navGroups[3].items.slice(7, 8),
  navGroups[0].items.slice(1)
);

export const secondaryNavItems = navItems.filter(
  (item) => !mainNavItems.some((m) => m.href === item.href)
);
