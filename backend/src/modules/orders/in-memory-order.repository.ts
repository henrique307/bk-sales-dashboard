import { isWithinRange, type DateRange } from "../../shared/date-range.js";
import { InMemoryRepository } from "../../shared/repositories/in-memory.repository.js";
import type { Order } from "./order.entity.js";
import type { OrderRepository } from "./order.repository.js";

export class InMemoryOrderRepository
  extends InMemoryRepository<Order>
  implements OrderRepository
{
  constructor() {
    super((order) => order.id);
  }

  async findByExternalId(
    source: string,
    externalId: string,
  ): Promise<Order | null> {
    const orders = await this.findAll();
    return (
      orders.find((o) => o.source === source && o.externalId === externalId) ??
      null
    );
  }

  async findByPeriod(range?: DateRange): Promise<Order[]> {
    const orders = await this.findAll();
    return orders.filter((order) => isWithinRange(order.createdAt, range));
  }
}
