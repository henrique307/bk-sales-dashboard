import { randomUUID } from "node:crypto";

export interface Product {
  id: string;
  sku: string;
  name: string;
  priceInCents: number;
  createdAt: Date;
}

export type NewProduct = Pick<Product, "sku" | "name" | "priceInCents">;

export function createProduct(data: NewProduct): Product {
  return { ...data, id: randomUUID(), createdAt: new Date() };
}
