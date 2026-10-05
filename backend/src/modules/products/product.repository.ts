import type { Repository } from "../../shared/repositories/repository.js";
import type { Product } from "./product.entity.js";

export interface ProductRepository extends Repository<Product> {
  findBySku(sku: string): Promise<Product | null>;
}
