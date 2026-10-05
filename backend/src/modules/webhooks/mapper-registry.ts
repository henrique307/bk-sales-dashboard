import { NotFoundError } from "../../shared/errors/app-error.js";
import { GenericEcommerceMapper } from "./mappers/generic-ecommerce.mapper.js";
import type { OrderWebhookMapper } from "./order-webhook-mapper.js";

// To support a new platform: create a mapper in ./mappers and add it to this list.
export const registeredMappers: OrderWebhookMapper[] = [
  new GenericEcommerceMapper(),
];

export class MapperRegistry {
  private readonly mappers: Map<string, OrderWebhookMapper>;

  constructor(mappers: OrderWebhookMapper[]) {
    this.mappers = new Map(mappers.map((mapper) => [mapper.platform, mapper]));
  }

  resolve(platform: string): OrderWebhookMapper {
    const mapper = this.mappers.get(platform);
    if (!mapper) throw new NotFoundError(`Unsupported platform "${platform}"`);
    return mapper;
  }
}
