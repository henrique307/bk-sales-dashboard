import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { validate } from "../../shared/http/validate.middleware.js";
import { toCents } from "../../shared/money.js";
import { toProductResponse } from "./product.presenter.js";
import { createProductSchema, type CreateProductInput } from "./product.schemas.js";
import type { ProductService } from "./product.service.js";

export function createProductRoutes(service: ProductService): Router {
  const router = Router();

  router.get(
    "/",
    asyncHandler(async (_req, res) => {
      const products = await service.list();
      res.json(products.map(toProductResponse));
    }),
  );

  router.post(
    "/",
    validate({ body: createProductSchema }),
    asyncHandler(async (req, res) => {
      const { sku, name, price } = req.body as CreateProductInput;
      const product = await service.create({ sku, name, priceInCents: toCents(price) });
      res.status(201).json(toProductResponse(product));
    }),
  );

  return router;
}
