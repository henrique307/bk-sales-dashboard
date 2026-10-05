import { z } from "zod";

export const productCostParamsSchema = z.object({
  productId: z.string().min(1),
});

export const upsertProductCostSchema = z.object({
  cost: z.number().nonnegative(),
});

export type ProductCostParams = z.infer<typeof productCostParamsSchema>;
export type UpsertProductCostInput = z.infer<typeof upsertProductCostSchema>;
