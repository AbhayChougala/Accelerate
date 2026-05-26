export const HOSPITAL_DATA = {
  kpis: {
    revenue: "₹4.2Cr",
    revenueDelta: 12,
    netProfit: "₹1.1Cr",
    profitDelta: 8,
    icuOccupancy: 87,
    bedOccupancy: 76,
    opdCount: 1243,
    satisfaction: 4.3,
    insuranceApproval: 78,
    emergencyCases: 34,
  },
  departments: [
    { name: "Cardiology", revenue: 1.2, patients: 342, satisfaction: 4.6, growth: 18 },
    { name: "Orthopedics", revenue: 1.0, patients: 289, satisfaction: 4.5, growth: 5 },
    { name: "Radiology", revenue: 0.8, patients: 201, satisfaction: 4.1, growth: -27 },
    { name: "OPD", revenue: 0.5, patients: 890, satisfaction: 3.8, growth: -4 },
    { name: "Emergency", revenue: 0.4, patients: 156, satisfaction: 4.0, growth: 2 },
    { name: "Neurology", revenue: 0.7, patients: 178, satisfaction: 4.3, growth: 9 },
  ],
  doctors: [
    { name: "Dr. Mehta", specialty: "Cardiology", hours: 72, surgeries: 18, nightShifts: 8, emergency: 24 },
    { name: "Dr. Singh", specialty: "Orthopedics", hours: 58, surgeries: 12, nightShifts: 5, emergency: 15 },
    { name: "Dr. Patel", specialty: "General Surgery", hours: 44, surgeries: 7, nightShifts: 2, emergency: 8 },
    { name: "Dr. Rao", specialty: "Neurology", hours: 68, surgeries: 15, nightShifts: 6, emergency: 20 },
    { name: "Dr. Sharma", specialty: "Pediatrics", hours: 38, surgeries: 5, nightShifts: 1, emergency: 6 },
  ],
  pharmacy: [
    { drug: "Amoxicillin", stock: 120, dailyUsage: 45, expiry: "2025-08-10", trend: 22 },
    { drug: "Metformin", stock: 340, dailyUsage: 38, expiry: "2025-11-20", trend: 5 },
    { drug: "Pantoprazole", stock: 28, dailyUsage: 31, expiry: "2025-07-05", trend: 18 },
    { drug: "Azithromycin", stock: 15, dailyUsage: 22, expiry: "2025-06-28", trend: 35 },
    { drug: "Paracetamol", stock: 890, dailyUsage: 120, expiry: "2026-02-14", trend: -3 },
    { drug: "Insulin", stock: 42, dailyUsage: 29, expiry: "2025-07-30", trend: 12 },
  ],
  reviews: [
    { text: "Doctor was excellent but waiting time was horrible", sentiment: "Mixed" as const },
    { text: "Billing process is very confusing and staff were rude", sentiment: "Negative" as const },
    { text: "Amazing care, felt completely at home, nurses were kind", sentiment: "Positive" as const },
    { text: "Emergency response was fast but rooms need cleaning", sentiment: "Mixed" as const },
  ],
  pendingClaims: [
    { patient: "Ramesh K.", amount: "₹1.8L", days: 18, risk: "High" as const },
    { patient: "Priya S.", amount: "₹0.9L", days: 12, risk: "Med" as const },
    { patient: "Amit D.", amount: "₹2.4L", days: 22, risk: "High" as const },
    { patient: "Sunita M.", amount: "₹0.6L", days: 8, risk: "Low" as const },
    { patient: "Vikram P.", amount: "₹1.2L", days: 15, risk: "Med" as const },
  ],
};

export function calcBurnoutScore(d: (typeof HOSPITAL_DATA.doctors)[0]) {
  const raw = d.hours * 0.4 + d.surgeries * 0.3 + d.nightShifts * 0.2 + d.emergency * 0.1;
  return Math.min(100, Math.round(raw));
}

export const REVENUE_TREND_30 = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  revenue: +(3.2 + Math.sin(i / 4) * 0.4 + Math.cos(i / 7) * 0.1 + i * 0.02).toFixed(2),
}));

export const BED_OCCUPANCY_30 = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  occupancy: +(68 + Math.sin(i / 5) * 8 + Math.cos(i / 3) * 2 + i * 0.15).toFixed(1),
}));

export const EMERGENCY_WEEKLY = [
  { week: "W1", cases: 28 }, { week: "W2", cases: 32 }, { week: "W3", cases: 30 },
  { week: "W4", cases: 35 }, { week: "W5", cases: 31 }, { week: "W6", cases: 38 },
  { week: "W7", cases: 42 }, { week: "W8", cases: 45 },
];

export function genIcuForecast() {
  const hist = [78, 82, 85, 84, 87, 86, 87];
  const pred = [88, 89, 91, 93, 92, 90, 88];
  return [
    ...hist.map((v, i) => ({ day: `Day -${7 - i}`, value: v, type: "Historical" })),
    ...pred.map((v, i) => ({ day: `Day +${i + 1}`, value: v, type: "AI Predicted" })),
  ];
}

export const AI_INSIGHTS = [
  "Cardiology revenue surged 18% — highest growth department this week",
  "ICU at 87% — predicted to exceed 90% threshold by tomorrow evening",
  "Radiology revenue anomaly detected — 27% drop vs last month",
  "Orthopedics leads patient satisfaction at 4.5/5",
  "OPD wait time complaints up 42% — staffing adjustment recommended",
];

export const SMART_ALERTS = [
  { label: "ICU Overcrowding Risk", severity: "critical" as const },
  { label: "Low Pharmacy Stock (Azithromycin)", severity: "warning" as const },
  { label: "High OPD Wait Time", severity: "warning" as const },
  { label: "Radiology Revenue Anomaly", severity: "critical" as const },
];
