import { z } from "zod";

export const createProductSchema = z.object({
  sku: z.string().trim().min(1).max(50),
  name: z.string().trim().min(1).max(120),
  price: z.number().positive(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
