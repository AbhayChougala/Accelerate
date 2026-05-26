export type Trend = "up" | "down" | "neutral";

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  trend?: Trend;
  unit?: string;
  icon?: string;
  status?: "good" | "warning" | "critical";
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  time: string;
  department?: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  revenue: number;
  occupancy: number;
  satisfaction: number;
  profit: number;
}

export interface DepartmentMetric {
  name: string;
  revenue: number;
  patients: number;
  margin: number;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  emoji?: string;
  badge?: string;
  premium?: boolean;
}

export interface FilterState {
  dateRange: string;
  branch: string;
  department: string;
  doctor: string;
}

export type ThemeMode = "light" | "dark";
