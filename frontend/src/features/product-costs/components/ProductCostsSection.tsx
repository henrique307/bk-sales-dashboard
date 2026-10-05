import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../../../shared/components/QueryState";
import { SectionCard } from "../../../shared/components/SectionCard";
import { useProductCosts } from "../hooks/use-product-costs";
import { EditableCostCell } from "./EditableCostCell";
export function ProductCostsSection() {
  const query = useProductCosts();
  return (
    <SectionCard title="Custos de produto">
      {query.isLoading ? (
        <LoadingState />
      ) : query.isError ? (
        <ErrorState />
      ) : !query.data?.length ? (
        <EmptyState message="Cadastre um produto para definir seu custo." />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th className="text-right">Custo</th>
              </tr>
            </thead>
            <tbody>
              {query.data.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sku}</p>
                  </td>
                  <td>
                    <EditableCostCell
                      productId={item.productId}
                      cost={item.cost}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}
