import { describe, expect, it } from "vitest";
import { DashboardService } from "../../src/modules/dashboard/dashboard.service.js";
import { InMemoryOrderRepository } from "../../src/modules/orders/in-memory-order.repository.js";
import { InMemoryProductCostRepository } from "../../src/modules/product-costs/in-memory-product-cost.repository.js";
import { InMemoryProductRepository } from "../../src/modules/products/in-memory-product.repository.js";

describe("DashboardService", () => {
  it("calculates summary, period and missing cost", async () => {
    const orders = new InMemoryOrderRepository(); const products = new InMemoryProductRepository(); const costs = new InMemoryProductCostRepository();
    await products.save({ id: "p1", sku: "P-1", name: "A", priceInCents: 5000, createdAt: new Date() });
    await costs.save({ productId: "p1", costInCents: 2000, updatedAt: new Date() });
    await orders.save({ id: "o1", externalId: "1", source: "x", customer: { name: "A", email: "a@a.com" }, items: [{ sku: "P-1", name: "A", quantity: 2, unitPriceInCents: 5000 }, { sku: "UNKNOWN", name: "B", quantity: 1, unitPriceInCents: 3000 }], totalInCents: 13000, createdAt: new Date("2025-02-10T12:00:00Z") });
    await orders.save({ id: "o2", externalId: "2", source: "x", customer: { name: "B", email: "b@b.com" }, items: [], totalInCents: 1000, createdAt: new Date("2025-03-10T12:00:00Z") });
    const service = new DashboardService(orders, products, costs);
    expect(await service.getSummary()).toEqual({ ordersCount: 2, revenueInCents: 14000, totalCostInCents: 4000, profitInCents: 10000 });
    expect(await service.getSummary({ start: new Date("2025-02-01"), end: new Date("2025-02-28T23:59:59Z") })).toEqual({ ordersCount: 1, revenueInCents: 13000, totalCostInCents: 4000, profitInCents: 9000 });
  });
});