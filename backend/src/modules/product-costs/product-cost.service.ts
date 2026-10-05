import { NotFoundError } from "../../shared/errors/app-error.js";
import type { Product } from "../products/product.entity.js";
import type { ProductRepository } from "../products/product.repository.js";
import type { ProductCost } from "./product-cost.entity.js";
import type { ProductCostRepository } from "./product-cost.repository.js";

export interface ProductWithCost {
  product: Product;
  cost: ProductCost | null;
}

export class ProductCostService {
  constructor(
    private readonly costs: ProductCostRepository,
    private readonly products: ProductRepository,
  ) {}

  async upsert(productId: string, costInCents: number): Promise<ProductCost> {
    if (!(await this.products.findById(productId))) {
      throw new NotFoundError(`Product "${productId}" not found`);
    }
    return this.costs.save({ productId, costInCents, updatedAt: new Date() });
  }

  async listWithProducts(): Promise<ProductWithCost[]> {
    const [products, costs] = await Promise.all([
      this.products.findAll(),
      this.costs.findAll(),
    ]);
    const costByProductId = new Map(
      costs.map((cost) => [cost.productId, cost]),
    );

    return products
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((product) => ({
        product,
        cost: costByProductId.get(product.id) ?? null,
      }));
  }
}
