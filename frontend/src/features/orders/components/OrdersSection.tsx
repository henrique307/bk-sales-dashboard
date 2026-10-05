import { useState } from "react";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../../../shared/components/QueryState";
import { SectionCard } from "../../../shared/components/SectionCard";
import { formatCurrency, formatDate } from "../../../shared/lib/format";
import type { Order } from "../api/orders-api";
import { useOrders } from "../hooks/use-orders";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

export function OrdersSection() {
  const query = useOrders();
  const [selected, setSelected] = useState<Order | null>(null);
  return (
    <>
      <SectionCard title="Pedidos recentes">
        {query.isLoading ? (
          <LoadingState />
        ) : query.isError ? (
          <ErrorState />
        ) : !query.data?.length ? (
          <EmptyState message="Nenhum pedido recebido." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {query.data.map((order) => (
                  <tr
                    className="cursor-pointer hover:bg-muted/50"
                    key={order.id}
                    onClick={() => setSelected(order)}
                  >
                    <td className="font-medium">{order.externalId}</td>
                    <td>{order.customer.name}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td className="text-right font-medium">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
      <OrderDetailsDialog
        order={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </>
  );
}
