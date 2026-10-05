import { useState } from "react";
import { Button } from "../../../shared/components/ui/button";
import { Input } from "../../../shared/components/ui/input";
import type { Period } from "../api/dashboard-api";

export function DateRangeFilter({
  onApply,
}: {
  onApply: (period: Period) => void;
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <form
      className="grid gap-3 sm:flex sm:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onApply({
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        });
      }}
    >
      <label className="grid gap-1 text-xs font-medium text-muted-foreground">
        Data inicial
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-muted-foreground">
        Data final
        <Input
          type="date"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <Button type="submit">Filtrar</Button>
    </form>
  );
}
