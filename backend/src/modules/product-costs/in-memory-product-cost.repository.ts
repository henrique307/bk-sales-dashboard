import { InMemoryRepository } from "../../shared/repositories/in-memory.repository.js";
import type { ProductCost } from "./product-cost.entity.js";
import type { ProductCostRepository } from "./product-cost.repository.js";

export class InMemoryProductCostRepository
  extends InMemoryRepository<ProductCost>
  implements ProductCostRepository
{
  constructor() {
    super((cost) => cost.productId);
  }
}
