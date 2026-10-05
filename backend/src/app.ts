import express, { Router, type Express } from "express";
import type { Container } from "./container.js";
import { createDashboardRoutes } from "./modules/dashboard/dashboard.routes.js";
import { createOrderRoutes } from "./modules/orders/order.routes.js";
import { createProductCostRoutes } from "./modules/product-costs/product-cost.routes.js";
import { createProductRoutes } from "./modules/products/product.routes.js";
import { createWebhookRoutes } from "./modules/webhooks/webhook.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./shared/http/error-handler.middleware.js";

export function createApp(container: Container): Express {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  const api = Router();
  api.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  api.use("/products", createProductRoutes(container.productService));
  api.use(
    "/product-costs",
    createProductCostRoutes(container.productCostService),
  );
  api.use("/orders", createOrderRoutes(container.orderService));
  api.use("/webhooks", createWebhookRoutes(container.webhookService));
  api.use("/dashboard", createDashboardRoutes(container.dashboardService));

  app.use("/api", api);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
