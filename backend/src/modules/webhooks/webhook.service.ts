import type { OrderService, RegisterOrderResult } from "../orders/order.service.js";
import type { MapperRegistry } from "./mapper-registry.js";

export class WebhookService {
  constructor(
    private readonly registry: MapperRegistry,
    private readonly orders: OrderService,
  ) {}

  async receiveOrder(platform: string, payload: unknown): Promise<RegisterOrderResult> {
    const order = this.registry.resolve(platform).toOrder(payload);
    return this.orders.register(order);
  }
}
