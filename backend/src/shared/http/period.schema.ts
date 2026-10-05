import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected format YYYY-MM-DD")
  .refine(
    (value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)),
    "Invalid date",
  );

export const periodQuerySchema = z
  .object({
    startDate: isoDate.optional(),
    endDate: isoDate.optional(),
  })
  .refine(
    ({ startDate, endDate }) => !startDate || !endDate || endDate >= startDate,
    {
      message: "endDate must be greater than or equal to startDate",
      path: ["endDate"],
    },
  );

export type PeriodQuery = z.infer<typeof periodQuerySchema>;
