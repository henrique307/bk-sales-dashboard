import { Plus } from "lucide-react";
import { useState } from "react";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../../../shared/components/QueryState";
import { SectionCard } from "../../../shared/components/SectionCard";
import { Button } from "../../../shared/components/ui/button";
import { formatCurrency } from "../../../shared/lib/format";
import { useProducts } from "../hooks/use-products";
import { ProductFormDialog } from "./ProductFormDialog";
export function ProductsSection() {
  const query = useProducts();
  const [open, setOpen] = useState(false);
  return (
    <>
      <SectionCard
        title="Produtos"
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            Novo
          </Button>
        }
      >
        {query.isLoading ? (
          <LoadingState />
        ) : query.isError ? (
          <ErrorState />
        ) : !query.data?.length ? (
          <EmptyState message="Nenhum produto cadastrado." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>SKU</th>
                  <th className="text-right">Preço</th>
                </tr>
              </thead>
              <tbody>
                {query.data.map((product) => (
                  <tr key={product.id}>
                    <td className="font-medium">{product.name}</td>
                    <td>{product.sku}</td>
                    <td className="text-right">
                      {formatCurrency(product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
      <ProductFormDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
