import type { DateRange } from "../../shared/date-range.js";
import type { Order } from "../orders/order.entity.js";
import type { OrderRepository } from "../orders/order.repository.js";
import type { ProductCostRepository } from "../product-costs/product-cost.repository.js";
import type { ProductRepository } from "../products/product.repository.js";

export interface DashboardSummary {
  ordersCount: number;
  revenueInCents: number;
  totalCostInCents: number;
  profitInCents: number;
}

export class DashboardService {
  constructor(
    private readonly orders: OrderRepository,
    private readonly products: ProductRepository,
    private readonly costs: ProductCostRepository,
  ) {}

  async getSummary(range?: DateRange): Promise<DashboardSummary> {
    const [orders, costBySku] = await Promise.all([
      this.orders.findByPeriod(range),
      this.buildCostBySku(),
    ]);

    const revenueInCents = orders.reduce(
      (sum, order) => sum + order.totalInCents,
      0,
    );
    const totalCostInCents = orders.reduce(
      (sum, order) => sum + this.orderCost(order, costBySku),
      0,
    );

    return {
      ordersCount: orders.length,
      revenueInCents,
      totalCostInCents,
      profitInCents: revenueInCents - totalCostInCents,
    };
  }

  // Uses the CURRENT cost of each product (no historical snapshot) — see README trade-offs.
  private async buildCostBySku(): Promise<Map<string, number>> {
    const [products, costs] = await Promise.all([
      this.products.findAll(),
      this.costs.findAll(),
    ]);
    const costByProductId = new Map(
      costs.map((cost) => [cost.productId, cost.costInCents]),
    );
    return new Map(
      products.map((p) => [p.sku, costByProductId.get(p.id) ?? 0]),
    );
  }

  private orderCost(order: Order, costBySku: Map<string, number>): number {
    return order.items.reduce(
      (sum, item) => sum + item.quantity * (costBySku.get(item.sku) ?? 0),
      0,
    );
  }
}
