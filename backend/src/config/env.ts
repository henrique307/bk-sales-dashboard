import { resolve } from "node:path";
import { config } from "dotenv";
import { z } from "zod";

// Looks in the backend folder first, then the monorepo root, so both `npm run dev` layouts work.
config({ path: [resolve(process.cwd(), ".env"), resolve(process.cwd(), "../.env")] });

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  SEED_DATA: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
