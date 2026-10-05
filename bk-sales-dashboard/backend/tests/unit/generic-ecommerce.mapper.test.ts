import { describe, expect, it } from "vitest";
import { ValidationError } from "../../src/shared/errors/app-error.js";
import { GenericEcommerceMapper } from "../../src/modules/webhooks/mappers/generic-ecommerce.mapper.js";

const validPayload = {
  id: "ORD-1", buyer: { buyerName: "Maria", buyerEmail: "maria@email.com" },
  lineItems: [{ itemId: "P-001", itemName: "Camiseta", qty: 2, unitPrice: 49.9 }],
  totalAmount: 99.8, createdAt: "2025-02-10T14:32:00Z",
};

describe("GenericEcommerceMapper", () => {
  const mapper = new GenericEcommerceMapper();
  it("maps and converts money to integer cents", () => {
    const order = mapper.toOrder(validPayload);
    expect(order).toMatchObject({ externalId: "ORD-1", source: "generic-ecommerce", totalInCents: 9980 });
    expect(order.items[0]?.unitPriceInCents).toBe(4990);
  });
  it("rejects an invalid payload", () => {
    expect(() => mapper.toOrder({ id: "ORD-1" })).toThrow(ValidationError);
  });
});