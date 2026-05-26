import {
  aiRecommendations,
  bedAvailability,
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
  weeklyOccupancy,
} from "@/lib/data";
import type { FilterState } from "@/lib/types";

export interface ChatDashboardContext {
  filters: FilterState;
  activePage?: string;
  pageTitle?: string;
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
  pageTitle?: string;
  lastUpdated?: string;
}): ChatDashboardContext {
  return {
    filters: {
      ...defaultFilters,
      ...input?.filters,
    },
    activePage: input?.activePage,
    pageTitle: input?.pageTitle,
    lastUpdated: input?.lastUpdated,
    exactMetrics: {
      beds: {
        total: bedAvailability.totalBeds,
        occupied: bedAvailability.occupiedBeds,
        available: bedAvailability.availableBeds,
        occupancyRate: `${bedAvailability.occupancyRate}%`,
        icuTotal: bedAvailability.icu.totalBeds,
        icuOccupied: bedAvailability.icu.occupiedBeds,
        icuAvailable: bedAvailability.icu.availableBeds,
        byWard: bedAvailability.wards,
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
