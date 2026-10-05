import type { Repository } from "../../shared/repositories/repository.js";
import type { ProductCost } from "./product-cost.entity.js";

// Keyed by productId: there is exactly one cost per product.
export type ProductCostRepository = Repository<ProductCost>;
