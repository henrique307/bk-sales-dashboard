import { useState } from "react";
import {
  ErrorState,
  LoadingState,
} from "../../../shared/components/QueryState";
import type { Period } from "../api/dashboard-api";
import { useDashboard } from "../hooks/use-dashboard";
import { DateRangeFilter } from "./DateRangeFilter";
import { SummaryCards } from "./SummaryCards";

export function DashboardSection() {
  const [period, setPeriod] = useState<Period>({});
  const query = useDashboard(period);
  return (
    <section className="grid gap-4">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-lg font-semibold">Visão geral</h2>
          <p className="text-sm text-muted-foreground">
            Resultados consolidados do período.
          </p>
        </div>
        <DateRangeFilter onApply={setPeriod} />
      </div>
      {query.isLoading ? (
        <LoadingState />
      ) : query.isError || !query.data ? (
        <ErrorState />
      ) : (
        <SummaryCards data={query.data} />
      )}
    </section>
  );
}
