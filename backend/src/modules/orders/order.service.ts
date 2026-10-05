import type { DateRange } from "../../shared/date-range.js";
import { createOrder, type NewOrder, type Order } from "./order.entity.js";
import type { OrderRepository } from "./order.repository.js";

export interface RegisterOrderResult {
  order: Order;
  created: boolean;
}

export class OrderService {
  constructor(private readonly orders: OrderRepository) {}

  async register(data: NewOrder): Promise<RegisterOrderResult> {
    const existing = await this.orders.findByExternalId(data.source, data.externalId);
    if (existing) return { order: existing, created: false };

    const order = await this.orders.save(createOrder(data));
    return { order, created: true };
  }

  async list(range?: DateRange): Promise<Order[]> {
    const orders = await this.orders.findByPeriod(range);
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
