import type { DateRange } from "../../shared/date-range.js";
import type { Repository } from "../../shared/repositories/repository.js";
import type { Order } from "./order.entity.js";

export interface OrderRepository extends Repository<Order> {
  findByExternalId(source: string, externalId: string): Promise<Order | null>;
  findByPeriod(range?: DateRange): Promise<Order[]>;
}
