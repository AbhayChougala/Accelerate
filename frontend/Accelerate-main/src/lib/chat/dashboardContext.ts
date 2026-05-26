import {
  aiRecommendations,
  branchComparison,
  ceoKpis,
  claimMetrics,
  criticalAlerts,
  executiveSummary,
  hospitalHealthScore,
  predictiveForecasts,
  revenueTrend,
  todaySnapshot,
  topDepartments,
  wardOccupancy,
  weeklyOccupancy,
} from "@/lib/data";
import type { FilterState } from "@/lib/types";

export interface ChatDashboardContext {
  filters: FilterState;
  activePage?: string;
  lastUpdated?: string;
  exactMetrics: {
    beds: {
      total: number;
      occupied: number;
      available: number;
      occupancyRate: string;
      icuTotal: number;
      icuOccupied: number;
      icuAvailable: number;
      byWard: Array<{
        ward: string;
        total: number;
        occupied: number;
        available: number;
        icu: boolean;
      }>;
    };
  };
  dashboardData: {
    ceoKpis: typeof ceoKpis;
    executiveSummary: typeof executiveSummary;
    hospitalHealthScore: typeof hospitalHealthScore;
    branchComparison: typeof branchComparison;
    topDepartments: typeof topDepartments;
    todaySnapshot: typeof todaySnapshot;
    weeklyOccupancy: typeof weeklyOccupancy;
    predictiveForecasts: typeof predictiveForecasts;
    revenueTrend: typeof revenueTrend;
    claimMetrics: typeof claimMetrics;
    criticalAlerts: typeof criticalAlerts;
    aiRecommendations: typeof aiRecommendations;
  };
}

const defaultFilters: FilterState = {
  dateRange: "MTD",
  branch: "All Branches",
  department: "All Departments",
  doctor: "All Doctors",
};

export function buildDashboardContext(input?: {
  filters?: Partial<FilterState>;
  activePage?: string;
  lastUpdated?: string;
}): ChatDashboardContext {
  const wards = wardOccupancy.map((ward) => ({
    ...ward,
    available: ward.total - ward.occupied,
  }));
  const total = wards.reduce((sum, ward) => sum + ward.total, 0);
  const occupied = wards.reduce((sum, ward) => sum + ward.occupied, 0);
  const icuWards = wards.filter((ward) => ward.icu);
  const icuTotal = icuWards.reduce((sum, ward) => sum + ward.total, 0);
  const icuOccupied = icuWards.reduce((sum, ward) => sum + ward.occupied, 0);

  return {
    filters: {
      ...defaultFilters,
      ...input?.filters,
    },
    activePage: input?.activePage,
    lastUpdated: input?.lastUpdated,
    exactMetrics: {
      beds: {
        total,
        occupied,
        available: total - occupied,
        occupancyRate: `${((occupied / total) * 100).toFixed(1)}%`,
        icuTotal,
        icuOccupied,
        icuAvailable: icuTotal - icuOccupied,
        byWard: wards,
      },
    },
    dashboardData: {
      ceoKpis,
      executiveSummary,
      hospitalHealthScore,
      branchComparison,
      topDepartments,
      todaySnapshot,
      weeklyOccupancy,
      predictiveForecasts,
      revenueTrend,
      claimMetrics,
      criticalAlerts,
      aiRecommendations,
    },
  };
}

export function getDeterministicAnswer(question: string, context: ChatDashboardContext) {
  const normalized = question.toLowerCase();
  const asksBeds =
    normalized.includes("bed") &&
    (normalized.includes("available") ||
      normalized.includes("availability") ||
      normalized.includes("empty") ||
      normalized.includes("vacant") ||
      normalized.includes("free"));

  if (!asksBeds) return null;

  const { beds } = context.exactMetrics;
  const wardBreakdown = beds.byWard
    .map((ward) => `${ward.ward}: ${ward.available}/${ward.total} available`)
    .join("; ");

  return `There are ${beds.available} beds available across the network right now (${beds.occupied}/${beds.total} occupied, ${beds.occupancyRate} occupancy). ICU availability is ${beds.icuAvailable} beds (${beds.icuOccupied}/${beds.icuTotal} occupied). Ward breakdown: ${wardBreakdown}.`;
}
