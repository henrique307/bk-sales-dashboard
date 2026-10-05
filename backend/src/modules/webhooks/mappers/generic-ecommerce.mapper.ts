import { z } from "zod";
import { ValidationError } from "../../../shared/errors/app-error.js";
import { toCents } from "../../../shared/money.js";
import type { NewOrder } from "../../orders/order.entity.js";
import type { OrderWebhookMapper } from "../order-webhook-mapper.js";

const genericEcommercePayloadSchema = z.object({
  id: z.string().min(1),
  buyer: z.object({
    buyerName: z.string().min(1),
    buyerEmail: z.string().email(),
  }),
  lineItems: z
    .array(
      z.object({
        itemId: z.string().min(1),
        itemName: z.string().min(1),
        qty: z.number().int().positive(),
        unitPrice: z.number().nonnegative(),
      }),
    )
    .min(1),
  totalAmount: z.number().nonnegative(),
  createdAt: z.string().datetime({ offset: true }),
});

export type GenericEcommercePayload = z.infer<
  typeof genericEcommercePayloadSchema
>;

export class GenericEcommerceMapper implements OrderWebhookMapper {
  readonly platform = "generic-ecommerce";

  toOrder(rawPayload: unknown): NewOrder {
    const result = genericEcommercePayloadSchema.safeParse(rawPayload);
    if (!result.success) {
      throw new ValidationError(
        "Invalid generic-ecommerce payload",
        result.error.flatten(),
      );
    }
    const payload = result.data;

    return {
      externalId: payload.id,
      source: this.platform,
      customer: {
        name: payload.buyer.buyerName,
        email: payload.buyer.buyerEmail,
      },
      items: payload.lineItems.map((item) => ({
        sku: item.itemId,
        name: item.itemName,
        quantity: item.qty,
        unitPriceInCents: toCents(item.unitPrice),
      })),
      totalInCents: toCents(payload.totalAmount),
      createdAt: new Date(payload.createdAt),
    };
  }
}
