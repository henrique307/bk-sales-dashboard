import { ConflictError } from "../../shared/errors/app-error.js";
import { createProduct, type NewProduct, type Product } from "./product.entity.js";
import type { ProductRepository } from "./product.repository.js";

export class ProductService {
  constructor(private readonly products: ProductRepository) {}

  async create(data: NewProduct): Promise<Product> {
    if (await this.products.findBySku(data.sku)) {
      throw new ConflictError(`Product with SKU "${data.sku}" already exists`);
    }
    return this.products.save(createProduct(data));
  }

  async list(): Promise<Product[]> {
    const products = await this.products.findAll();
    return products.sort((a, b) => a.name.localeCompare(b.name));
  }
}
