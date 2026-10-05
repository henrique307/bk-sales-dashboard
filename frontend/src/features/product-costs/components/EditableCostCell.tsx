import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../shared/components/ui/button";
import { Input } from "../../../shared/components/ui/input";
import { formatCurrency } from "../../../shared/lib/format";
import { useSaveProductCost } from "../hooks/use-product-costs";

export function EditableCostCell({
  productId,
  cost,
}: {
  productId: string;
  cost: number | null;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(cost?.toFixed(2) ?? "");
  const mutation = useSaveProductCost();
  const save = (e: any) => {
    e.preventDefault?.();
    const parsed = Number(value.replace(",", "."));
    if (!Number.isFinite(parsed) || parsed < 0) return;
    mutation.mutate(
      { productId, cost: parsed },
      { onSuccess: () => setEditing(false) },
    );
  };
  if (!editing)
    return (
      <div className="flex items-center justify-end gap-2">
        <span>{cost === null ? "Não definido" : formatCurrency(cost)}</span>
        <Button
          variant="ghost"
          className="size-8 p-0"
          aria-label="Editar custo"
          onClick={() => setEditing(true)}
        >
          <Pencil className="size-4" />
        </Button>
      </div>
    );
  return (
    <form
      className="flex min-w-52 items-center justify-end gap-1"
      onSubmit={save}
    >
      <Input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Custo"
      />
      <Button
        className="size-8 p-0"
        aria-label="Salvar"
        onClick={save}
        disabled={mutation.isPending}
      >
        <Check className="size-4" />
      </Button>
      <Button
        variant="ghost"
        className="size-8 p-0"
        aria-label="Cancelar"
        onClick={() => {
          setEditing(false);
          setValue(cost?.toFixed(2) ?? "");
        }}
      >
        <X className="size-4" />
      </Button>
    </form>
  );
}
