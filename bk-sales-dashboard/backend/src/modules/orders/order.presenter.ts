import { fromCents } from "../../shared/money.js";
import type { Order } from "./order.entity.js";

export function toOrderResponse(order: Order) {
  return {
    id: order.id,
    externalId: order.externalId,
    source: order.source,
    customer: order.customer,
    items: order.items.map((item) => ({
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      unitPrice: fromCents(item.unitPriceInCents),
      subtotal: fromCents(item.unitPriceInCents * item.quantity),
    })),
    total: fromCents(order.totalInCents),
    createdAt: order.createdAt.toISOString(),
  };
}
