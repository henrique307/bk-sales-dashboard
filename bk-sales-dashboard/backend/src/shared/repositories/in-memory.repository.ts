import type { Repository } from "./repository.js";

export class InMemoryRepository<T> implements Repository<T> {
  protected readonly items = new Map<string, T>();

  constructor(private readonly getKey: (entity: T) => string) {}

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<T[]> {
    return [...this.items.values()];
  }

  async save(entity: T): Promise<T> {
    this.items.set(this.getKey(entity), entity);
    return entity;
  }
}
