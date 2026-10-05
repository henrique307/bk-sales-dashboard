import { useQuery } from "@tanstack/react-query";
import { getDashboard, type Period } from "../api/dashboard-api";
export function useDashboard(period: Period) { return useQuery({ queryKey: ["dashboard", period], queryFn: () => getDashboard(period) }); }