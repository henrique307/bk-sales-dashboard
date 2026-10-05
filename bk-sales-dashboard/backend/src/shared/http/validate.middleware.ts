import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod";
import { ValidationError } from "../errors/app-error.js";

interface RequestSchemas {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}

export function validate(schemas: RequestSchemas): RequestHandler {
  return (req, _res, next) => {
    for (const key of ["body", "params", "query"] as const) {
      const schema = schemas[key];
      if (!schema) continue;
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        return next(new ValidationError(`Invalid request ${key}`, result.error.flatten()));
      }
      req[key] = result.data;
    }
    next();
  };
}
