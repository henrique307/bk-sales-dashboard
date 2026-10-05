import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { validate } from "../../shared/http/validate.middleware.js";
import { toCents } from "../../shared/money.js";
import { toProductCostResponse, toProductWithCostResponse } from "./product-cost.presenter.js";
import {
  productCostParamsSchema,
  upsertProductCostSchema,
  type ProductCostParams,
  type UpsertProductCostInput,
} from "./product-cost.schemas.js";
import type { ProductCostService } from "./product-cost.service.js";

export function createProductCostRoutes(service: ProductCostService): Router {
  const router = Router();

  router.get(
    "/",
    asyncHandler(async (_req, res) => {
      const items = await service.listWithProducts();
      res.json(items.map(toProductWithCostResponse));
    }),
  );

  router.put(
    "/:productId",
    validate({ params: productCostParamsSchema, body: upsertProductCostSchema }),
    asyncHandler(async (req, res) => {
      const { productId } = req.params as ProductCostParams;
      const { cost } = req.body as UpsertProductCostInput;
      const saved = await service.upsert(productId, toCents(cost));
      res.json(toProductCostResponse(saved));
    }),
  );

  return router;
}
