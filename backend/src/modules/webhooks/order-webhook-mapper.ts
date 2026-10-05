import type { NewOrder } from "../orders/order.entity.js";

/**
 * Contract every e-commerce platform adapter implements.
 * The mapper is the only place that knows the external payload shape:
 * it validates the raw body and translates it into the domain model.
 */
export interface OrderWebhookMapper {
  readonly platform: string;
  toOrder(rawPayload: unknown): NewOrder;
}
