import { http } from "../../../shared/api/http-client";
export interface DashboardSummary {
  ordersCount: number;
  revenue: number;
  totalCost: number;
  profit: number;
}
export interface Period {
  startDate?: string;
  endDate?: string;
}
export function getDashboard(period: Period) {
  const query = new URLSearchParams();
  if (period.startDate) query.set("startDate", period.startDate);
  if (period.endDate) query.set("endDate", period.endDate);
  return http<DashboardSummary>(`/api/dashboard?${query}`);
}
