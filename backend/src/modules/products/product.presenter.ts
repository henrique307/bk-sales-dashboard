import { fromCents } from "../../shared/money.js";
import type { Product } from "./product.entity.js";

export function toProductResponse(product: Product) {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    price: fromCents(product.priceInCents),
    createdAt: product.createdAt.toISOString(),
  };
}
