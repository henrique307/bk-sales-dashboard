import type { Container } from "./container.js";

const products = [
  { sku: "P-001", name: "Camiseta Básica", price: 4990, cost: 2000 },
  { sku: "P-002", name: "Calça Jeans", price: 12990, cost: 6000 },
  { sku: "P-003", name: "Tênis Esportivo", price: 24990, cost: 12000 },
  { sku: "P-004", name: "Boné Aba Curva", price: 3990, cost: 1500 },
];

const orders = [
  { id: "ORD-98432", name: "Maria Souza", email: "maria@email.com", date: "2025-02-10T14:32:00Z", items: [["P-001", 2], ["P-002", 1]] },
  { id: "ORD-98433", name: "João Pereira", email: "joao@email.com", date: "2025-02-11T09:15:00Z", items: [["P-003", 1]] },
  { id: "ORD-98434", name: "Ana Lima", email: "ana@email.com", date: "2025-02-12T18:40:00Z", items: [["P-004", 3], ["P-001", 1]] },
  { id: "ORD-98435", name: "Carlos Mendes", email: "carlos@email.com", date: "2025-02-14T11:05:00Z", items: [["P-002", 2]] },
  { id: "ORD-98436", name: "Beatriz Rocha", email: "beatriz@email.com", date: "2025-02-15T16:20:00Z", items: [["P-003", 1], ["P-004", 1]] },
] as const;

export async function seed(container: Container): Promise<void> {
  const priceBySku = new Map<string, { name: string; price: number }>();

  for (const { sku, name, price, cost } of products) {
    const product = await container.productService.create({ sku, name, priceInCents: price });
    await container.productCostService.upsert(product.id, cost);
    priceBySku.set(sku, { name, price });
  }

  for (const order of orders) {
    const items = order.items.map(([sku, quantity]) => {
      const product = priceBySku.get(sku);
      if (!product) throw new Error(`Seed product ${sku} not found`);
      return { sku, name: product.name, quantity, unitPriceInCents: product.price };
    });
    await container.orderService.register({
      externalId: order.id,
      source: "generic-ecommerce",
      customer: { name: order.name, email: order.email },
      items,
      totalInCents: items.reduce((sum, i) => sum + i.quantity * i.unitPriceInCents, 0),
      createdAt: new Date(order.date),
    });
  }
}
