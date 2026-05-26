import type { Alert, Branch, DepartmentMetric, KpiMetric } from "../types";

export const HOSPITAL_NAME = "MedVista Health Network";
export const BRANCHES = ["All Branches", "Mumbai Central", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai"];
export const DEPARTMENTS = ["All Departments", "Cardiology", "Oncology", "Orthopedics", "Neurology", "General Medicine", "Pediatrics", "Emergency", "Diagnostics", "Pharmacy"];
export const DOCTORS = ["All Doctors", "Dr. Sharma", "Dr. Patel", "Dr. Reddy", "Dr. Iyer", "Dr. Khan", "Dr. Mehta"];

export const ceoKpis: KpiMetric[] = [
  { id: "revenue", label: "Total Revenue (MTD)", value: formatCr(42.8), change: 8.4, trend: "up", status: "good" },
  { id: "profit", label: "Net Profit", value: formatCr(6.2), change: 5.1, trend: "up", status: "good" },
  { id: "ebitda", label: "EBITDA", value: formatCr(9.4), change: 3.8, trend: "up", status: "good" },
  { id: "opd", label: "OPD Patients Today", value: "2,847", change: 12.3, trend: "up" },
  { id: "ipd", label: "IPD Admissions", value: "186", change: -2.1, trend: "down" },
  { id: "icu", label: "ICU Occupancy", value: "89%", change: 4.2, trend: "up", status: "warning" },
  { id: "beds", label: "Bed Occupancy", value: "82.4%", change: 1.8, trend: "up" },
  { id: "alos", label: "Avg Length of Stay", value: "4.2 days", change: -0.3, trend: "down", status: "good" },
  { id: "ot", label: "OT Utilization", value: "76%", change: 6.5, trend: "up" },
  { id: "claims", label: "Claim Approval Rate", value: "91.2%", change: 2.1, trend: "up" },
  { id: "satisfaction", label: "Patient Satisfaction", value: "4.6/5", change: 0.2, trend: "up", status: "good" },
  { id: "readmission", label: "Readmission Rate", value: "3.8%", change: -0.5, trend: "down", status: "good" },
  { id: "emergency", label: "Emergency Cases", value: "124", change: 18.2, trend: "up", status: "warning" },
  { id: "diagnostics", label: "Diagnostics Revenue", value: formatCr(8.1), change: 11.2, trend: "up" },
  { id: "pharmacy", label: "Pharmacy Revenue", value: formatCr(5.4), change: 7.8, trend: "up" },
  { id: "cashflow", label: "Cash Flow Status", value: "Healthy", change: 0, trend: "neutral", status: "good" },
];

function formatCr(n: number) {
  return `₹${n} Cr`;
}

export const revenueTrend = [
  { month: "Oct", revenue: 38.2, forecast: 38.5, profit: 5.1 },
  { month: "Nov", revenue: 39.8, forecast: 40.1, profit: 5.4 },
  { month: "Dec", revenue: 41.2, forecast: 41.0, profit: 5.8 },
  { month: "Jan", revenue: 40.1, forecast: 40.5, profit: 5.6 },
  { month: "Feb", revenue: 41.5, forecast: 41.8, profit: 5.9 },
  { month: "Mar", revenue: 42.8, forecast: 44.2, profit: 6.2 },
  { month: "Apr", revenue: null, forecast: 45.1, profit: 6.5 },
];

export const hospitalHealthScore = 87;

export const executiveSummary = `MedVista network delivered strong MTD performance with ₹42.8 Cr revenue (+8.4% YoY). Mumbai Central and Bangalore branches exceeded targets. ICU occupancy at 89% requires capacity review. Ayushman Bharat volume up 14% with improved claim turnaround. Diagnostics and pharmacy continue as high-margin growth drivers.`;

export const aiRecommendations = [
  { id: "1", priority: "high", text: "Expand ICU beds at Mumbai Central — projected 94% occupancy next week", impact: "₹1.2 Cr revenue at risk" },
  { id: "2", priority: "medium", text: "Optimize OT scheduling at Delhi NCR — 18% idle time detected Thu-Fri", impact: "₹45L monthly recovery potential" },
  { id: "3", priority: "high", text: "Accelerate TPA claim follow-ups — ₹2.3 Cr outstanding >45 days", impact: "Cash flow improvement" },
  { id: "4", priority: "low", text: "Increase generic medicine ratio in pharmacy — 12% margin uplift possible", impact: "₹18L/month" },
];

export const criticalAlerts: Alert[] = [
  { id: "1", title: "ICU Capacity Critical", message: "Mumbai Central ICU at 96% — 2 ventilators available", severity: "critical", time: "12 min ago", department: "Critical Care" },
  { id: "2", title: "Revenue Anomaly", message: "Orthopedics revenue down 14% vs forecast this week", severity: "warning", time: "45 min ago", department: "Orthopedics" },
  { id: "3", title: "Claim Rejection Spike", message: "Star Health rejections up 22% — documentation gap detected", severity: "warning", time: "1 hr ago", department: "Insurance" },
  { id: "4", title: "ER Wait Time Alert", message: "Delhi NCR ER average wait 47 min — exceeds 30 min SLA", severity: "critical", time: "2 hrs ago", department: "Emergency" },
  { id: "5", title: "NABH Audit Reminder", message: "Cardiology unit documentation review due in 5 days", severity: "info", time: "3 hrs ago", department: "Quality" },
];

export const branchComparison: Branch[] = [
  { id: "mum", name: "Mumbai Central", city: "Mumbai", revenue: 12.4, occupancy: 88, satisfaction: 4.7, profit: 2.1 },
  { id: "del", name: "Delhi NCR", city: "Delhi", revenue: 10.8, occupancy: 79, satisfaction: 4.5, profit: 1.6 },
  { id: "blr", name: "Bangalore", city: "Bangalore", revenue: 9.2, occupancy: 84, satisfaction: 4.8, profit: 1.5 },
  { id: "hyd", name: "Hyderabad", city: "Hyderabad", revenue: 5.6, occupancy: 76, satisfaction: 4.4, profit: 0.8 },
  { id: "pun", name: "Pune", city: "Pune", revenue: 3.2, occupancy: 71, satisfaction: 4.3, profit: 0.5 },
  { id: "che", name: "Chennai", city: "Chennai", revenue: 1.6, occupancy: 68, satisfaction: 4.5, profit: 0.3 },
];

export const topDepartments: DepartmentMetric[] = [
  { name: "Cardiology", revenue: 8.2, patients: 1240, margin: 34 },
  { name: "Oncology", revenue: 7.1, patients: 680, margin: 28 },
  { name: "Orthopedics", revenue: 6.4, patients: 920, margin: 31 },
  { name: "Diagnostics", revenue: 8.1, patients: 18500, margin: 42 },
  { name: "Neurology", revenue: 4.8, patients: 540, margin: 29 },
];

export const todaySnapshot = [
  { label: "Surgeries Completed", value: "47", sub: "6 emergency" },
  { label: "Lab Tests Processed", value: "3,842", sub: "TAT 4.2 hrs avg" },
  { label: "Discharges", value: "142", sub: "On track" },
  { label: "New Admissions", value: "186", sub: "+12 vs yesterday" },
  { label: "Ayushman Bharat Cases", value: "89", sub: "₹12.4L approved" },
  { label: "UPI Collections", value: "₹1.8 Cr", sub: "68% of OPD payments" },
  { label: "Telemedicine Consults", value: "234", sub: "+28% WoW" },
  { label: "Ambulance Dispatches", value: "38", sub: "Avg response 11 min" },
];

export const revenueByDepartment = [
  { name: "Cardiology", value: 8.2, color: "#0ea5e9" },
  { name: "Diagnostics", value: 8.1, color: "#8b5cf6" },
  { name: "Oncology", value: 7.1, color: "#ec4899" },
  { name: "Orthopedics", value: 6.4, color: "#10b981" },
  { name: "Neurology", value: 4.8, color: "#f59e0b" },
  { name: "General Med", value: 4.2, color: "#6366f1" },
  { name: "Pharmacy", value: 5.4, color: "#14b8a6" },
  { name: "Others", value: 3.6, color: "#94a3b8" },
];

export const opdVsIpd = [
  { name: "OPD", value: 18.4, fill: "#0ea5e9" },
  { name: "IPD", value: 16.8, fill: "#8b5cf6" },
  { name: "Diagnostics", value: 8.1, fill: "#10b981" },
  { name: "Pharmacy", value: 5.4, fill: "#f59e0b" },
  { name: "Surgery", value: 7.2, fill: "#ec4899" },
];

export const expenseBreakdown = [
  { category: "Staff Salaries", amount: 14.2 },
  { category: "Medicine Procurement", amount: 6.8 },
  { category: "Utilities", amount: 2.1 },
  { category: "Equipment Maintenance", amount: 1.8 },
  { category: "Vendor Costs", amount: 3.4 },
  { category: "Operations", amount: 4.2 },
];

export const weeklyOccupancy = [
  { day: "Mon", general: 78, icu: 85, emergency: 62 },
  { day: "Tue", general: 81, icu: 87, emergency: 58 },
  { day: "Wed", general: 84, icu: 89, emergency: 71 },
  { day: "Thu", general: 82, icu: 91, emergency: 68 },
  { day: "Fri", general: 86, icu: 93, emergency: 74 },
  { day: "Sat", general: 79, icu: 88, emergency: 65 },
  { day: "Sun", general: 75, icu: 86, emergency: 59 },
];

export const doctorLeaderboard = [
  { rank: 1, name: "Dr. Ananya Sharma", specialty: "Cardiology", patients: 342, revenue: 2.4, rating: 4.9, score: 96 },
  { rank: 2, name: "Dr. Rajesh Patel", specialty: "Orthopedics", patients: 298, revenue: 2.1, rating: 4.8, score: 94 },
  { rank: 3, name: "Dr. Priya Reddy", specialty: "Oncology", patients: 186, revenue: 1.9, rating: 4.9, score: 93 },
  { rank: 4, name: "Dr. Vikram Iyer", specialty: "Neurology", patients: 224, revenue: 1.6, rating: 4.7, score: 91 },
  { rank: 5, name: "Dr. Arjun Khan", specialty: "General Surgery", patients: 267, revenue: 1.5, rating: 4.6, score: 89 },
];

export const patientSatisfactionTrend = [
  { month: "Oct", nps: 62, csat: 4.3, waitTime: 28 },
  { month: "Nov", nps: 65, csat: 4.4, waitTime: 26 },
  { month: "Dec", nps: 68, csat: 4.5, waitTime: 24 },
  { month: "Jan", nps: 64, csat: 4.4, waitTime: 27 },
  { month: "Feb", nps: 70, csat: 4.5, waitTime: 23 },
  { month: "Mar", nps: 72, csat: 4.6, waitTime: 22 },
];

export const claimMetrics = [
  { tpa: "Star Health", approved: 892, rejected: 48, pending: 124, avgDays: 12 },
  { tpa: "HDFC ERGO", approved: 756, rejected: 32, pending: 89, avgDays: 10 },
  { tpa: "ICICI Lombard", approved: 634, rejected: 41, pending: 156, avgDays: 15 },
  { tpa: "Ayushman Bharat", approved: 1240, rejected: 86, pending: 210, avgDays: 18 },
  { tpa: "Niva Bupa", approved: 445, rejected: 28, pending: 67, avgDays: 11 },
];

export const hourlyThroughput = [
  { hour: "6AM", opd: 45, ipd: 12, er: 8 },
  { hour: "8AM", opd: 180, ipd: 28, er: 22 },
  { hour: "10AM", opd: 320, ipd: 35, er: 18 },
  { hour: "12PM", opd: 280, ipd: 42, er: 24 },
  { hour: "2PM", opd: 240, ipd: 38, er: 20 },
  { hour: "4PM", opd: 195, ipd: 32, er: 16 },
  { hour: "6PM", opd: 120, ipd: 25, er: 14 },
  { hour: "8PM", opd: 65, ipd: 18, er: 28 },
];

export const wardOccupancy = [
  { ward: "General A", total: 120, occupied: 98, icu: false },
  { ward: "General B", total: 100, occupied: 82, icu: false },
  { ward: "Cardiac ICU", total: 24, occupied: 22, icu: true },
  { ward: "Medical ICU", total: 20, occupied: 19, icu: true },
  { ward: "Pediatric", total: 40, occupied: 28, icu: false },
  { ward: "Maternity", total: 50, occupied: 44, icu: false },
  { ward: "Emergency", total: 30, occupied: 24, icu: false },
  { ward: "Oncology", total: 36, occupied: 31, icu: false },
];

export const predictiveForecasts = [
  { metric: "Patient Inflow", current: 2847, predicted: 3120, confidence: 89 },
  { metric: "Revenue (Cr)", current: 42.8, predicted: 45.1, confidence: 85 },
  { metric: "Bed Occupancy %", current: 82.4, predicted: 86.2, confidence: 91 },
  { metric: "Staff Attrition %", current: 8.2, predicted: 7.8, confidence: 78 },
  { metric: "Readmission %", current: 3.8, predicted: 3.5, confidence: 82 },
];

export const sankeyFlow = [
  { source: "OPD", target: "Diagnostics", value: 420 },
  { source: "OPD", target: "Pharmacy", value: 680 },
  { source: "OPD", target: "IPD", value: 186 },
  { source: "IPD", target: "Surgery", value: 94 },
  { source: "IPD", target: "Diagnostics", value: 320 },
  { source: "Emergency", target: "IPD", value: 48 },
  { source: "Emergency", target: "ICU", value: 32 },
];

export const heatmapCongestion = [
  { dept: "Cardiology", h8: 45, h10: 78, h12: 92, h14: 85, h16: 70 },
  { dept: "Orthopedics", h8: 62, h10: 88, h12: 95, h14: 90, h16: 75 },
  { dept: "General Med", h8: 55, h10: 72, h12: 80, h14: 78, h16: 65 },
  { dept: "Diagnostics", h8: 70, h10: 95, h12: 98, h14: 92, h16: 80 },
  { dept: "Emergency", h8: 40, h10: 55, h12: 68, h14: 72, h16: 85 },
];

export const esgMetrics = [
  { metric: "Energy (kWh/bed)", value: 42, target: 38, unit: "kWh" },
  { metric: "Water (L/patient)", value: 185, target: 160, unit: "L" },
  { metric: "Biomedical Waste (kg)", value: 1240, target: 1100, unit: "kg" },
  { metric: "Carbon Footprint", value: 2.4, target: 2.0, unit: "tCO2e" },
  { metric: "CSR Outreach", value: 12400, target: 15000, unit: "patients" },
];

export const chatResponses: Record<string, string> = {
  profitability: "Profitability declined 2.1% this week primarily due to: (1) Orthopedics revenue drop of 14% from reduced elective surgeries, (2) Increased ICU staffing costs at Mumbai Central (+₹18L), and (3) Delayed insurance settlements affecting cash recognition. Recommend OT schedule optimization and TPA follow-up acceleration.",
  departments: "Underperforming departments this week: Orthopedics (-14% revenue), General Medicine (-8% patient volume), and Delhi NCR Emergency (-12% satisfaction). Top performers: Diagnostics (+11%), Cardiology (+9%), and Pharmacy (+8%).",
  icu: "ICU occupancy forecast for next month: Week 1: 88%, Week 2: 91%, Week 3: 94% (critical), Week 4: 89%. Mumbai Central and Bangalore require 4-6 additional ICU beds. Recommend deferring elective admissions during peak weeks.",
  default: "I can help analyze hospital performance, predict trends, and provide strategic recommendations. Try asking: 'Why did profitability decline this week?', 'What departments are underperforming?', or 'Predict ICU occupancy next month.'",
};
