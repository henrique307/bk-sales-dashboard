import { CircleDollarSign, PackageCheck, ReceiptText, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../../shared/lib/format";
import type { DashboardSummary } from "../api/dashboard-api";

export function SummaryCards({ data }: { data: DashboardSummary }) {
  const cards = [
    { label: "Lucro", value: formatCurrency(data.profit), icon: TrendingUp },
    { label: "Faturamento", value: formatCurrency(data.revenue), icon: CircleDollarSign },
    { label: "Custo total", value: formatCurrency(data.totalCost), icon: ReceiptText },
    { label: "Total de pedidos", value: String(data.ordersCount), icon: PackageCheck },
  ];
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(({ label, value, icon: Icon }) =>
    <div className="rounded-lg border bg-card p-5 shadow-sm" key={label}><div className="flex items-center justify-between text-sm text-muted-foreground"><span>{label}</span><Icon className="size-4 text-primary" /></div><p className="mt-3 text-2xl font-bold">{value}</p></div>
  )}</div>;
}