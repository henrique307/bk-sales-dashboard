import { InMemoryRepository } from "../../shared/repositories/in-memory.repository.js";
import type { Product } from "./product.entity.js";
import type { ProductRepository } from "./product.repository.js";

export class InMemoryProductRepository
  extends InMemoryRepository<Product>
  implements ProductRepository
{
  constructor() {
    super((product) => product.id);
  }

  async findBySku(sku: string): Promise<Product | null> {
    const products = await this.findAll();
    return products.find((product) => product.sku === sku) ?? null;
  }
}
