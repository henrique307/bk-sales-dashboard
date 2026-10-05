import { Router } from "express";
import { toDateRange } from "../../shared/date-range.js";
import { asyncHandler } from "../../shared/http/async-handler.js";
import {
  periodQuerySchema,
  type PeriodQuery,
} from "../../shared/http/period.schema.js";
import { validate } from "../../shared/http/validate.middleware.js";
import { toOrderResponse } from "./order.presenter.js";
import type { OrderService } from "./order.service.js";

export function createOrderRoutes(service: OrderService): Router {
  const router = Router();

  router.get(
    "/",
    validate({ query: periodQuerySchema }),
    asyncHandler(async (req, res) => {
      const { startDate, endDate } = req.query as PeriodQuery;
      const orders = await service.list(toDateRange(startDate, endDate));
      res.json(orders.map(toOrderResponse));
    }),
  );

  return router;
}
