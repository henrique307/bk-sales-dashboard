import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { validate } from "../../shared/http/validate.middleware.js";
import { toOrderResponse } from "../orders/order.presenter.js";
import type { WebhookService } from "./webhook.service.js";

const webhookParamsSchema = z.object({ platform: z.string().min(1) });

export function createWebhookRoutes(service: WebhookService): Router {
  const router = Router();

  router.post(
    "/:platform/orders",
    validate({ params: webhookParamsSchema }),
    asyncHandler(async (req, res) => {
      const { platform } = req.params as z.infer<typeof webhookParamsSchema>;
      const { order, created } = await service.receiveOrder(platform, req.body);
      res.status(created ? 201 : 200).json(toOrderResponse(order));
    }),
  );

  return router;
}
