import { DashboardService } from "./modules/dashboard/dashboard.service.js";
import { InMemoryOrderRepository } from "./modules/orders/in-memory-order.repository.js";
import { OrderService } from "./modules/orders/order.service.js";
import { InMemoryProductCostRepository } from "./modules/product-costs/in-memory-product-cost.repository.js";
import { ProductCostService } from "./modules/product-costs/product-cost.service.js";
import { InMemoryProductRepository } from "./modules/products/in-memory-product.repository.js";
import { ProductService } from "./modules/products/product.service.js";
import { MapperRegistry, registeredMappers } from "./modules/webhooks/mapper-registry.js";
import { WebhookService } from "./modules/webhooks/webhook.service.js";

/** Composition root: the only place that knows concrete implementations. */
export function createContainer() {
  const productRepository = new InMemoryProductRepository();
  const productCostRepository = new InMemoryProductCostRepository();
  const orderRepository = new InMemoryOrderRepository();

  const productService = new ProductService(productRepository);
  const productCostService = new ProductCostService(productCostRepository, productRepository);
  const orderService = new OrderService(orderRepository);
  const webhookService = new WebhookService(new MapperRegistry(registeredMappers), orderService);
  const dashboardService = new DashboardService(
    orderRepository,
    productRepository,
    productCostRepository,
  );

  return { productService, productCostService, orderService, webhookService, dashboardService };
}

export type Container = ReturnType<typeof createContainer>;
