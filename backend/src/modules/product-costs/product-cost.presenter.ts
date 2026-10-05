import { fromCents } from "../../shared/money.js";
import type { ProductCost } from "./product-cost.entity.js";
import type { ProductWithCost } from "./product-cost.service.js";

export function toProductCostResponse(cost: ProductCost) {
  return {
    productId: cost.productId,
    cost: fromCents(cost.costInCents),
    updatedAt: cost.updatedAt.toISOString(),
  };
}

export function toProductWithCostResponse({ product, cost }: ProductWithCost) {
  return {
    productId: product.id,
    sku: product.sku,
    name: product.name,
    cost: cost ? fromCents(cost.costInCents) : null,
    updatedAt: cost ? cost.updatedAt.toISOString() : null,
  };
}
