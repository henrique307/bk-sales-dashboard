import { randomUUID } from "node:crypto";

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPriceInCents: number;
}

export interface Order {
  id: string;
  externalId: string;
  source: string;
  customer: { name: string; email: string };
  items: OrderItem[];
  totalInCents: number;
  createdAt: Date;
}

export type NewOrder = Omit<Order, "id">;

export function createOrder(data: NewOrder): Order {
  return { ...data, id: randomUUID() };
}
