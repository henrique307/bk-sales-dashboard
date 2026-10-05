import { Router } from "express";
import { toDateRange } from "../../shared/date-range.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { validate } from "../../shared/http/validate.middleware.js";
import { fromCents } from "../../shared/money.js";
import {
  dashboardQuerySchema,
  type DashboardQuery,
} from "./dashboard.schemas.js";
import type { DashboardService } from "./dashboard.service.js";

export function createDashboardRoutes(service: DashboardService): Router {
  const router = Router();

  router.get(
    "/",
    validate({ query: dashboardQuerySchema }),
    asyncHandler(async (req, res) => {
      const { startDate, endDate } = req.query as DashboardQuery;
      const summary = await service.getSummary(toDateRange(startDate, endDate));
      res.json({
        ordersCount: summary.ordersCount,
        revenue: fromCents(summary.revenueInCents),
        totalCost: fromCents(summary.totalCostInCents),
        profit: fromCents(summary.profitInCents),
      });
    }),
  );

  return router;
}
