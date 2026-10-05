import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createContainer } from "../../src/container.js";

describe("API", () => {
  let app: ReturnType<typeof createApp>;
  beforeEach(() => { app = createApp(createContainer()); });

  it("creates products, rejects duplicate SKU and upserts costs", async () => {
    const created = await request(app).post("/api/products").send({ sku: "P-1", name: "Produto", price: 10 }).expect(201);
    await request(app).post("/api/products").send({ sku: "P-1", name: "Outro", price: 20 }).expect(409);
    const before = await request(app).get("/api/product-costs").expect(200);
    expect(before.body[0].cost).toBeNull();
    await request(app).put(`/api/product-costs/${created.body.id}`).send({ cost: 4.5 }).expect(200);
    const after = await request(app).get("/api/product-costs").expect(200);
    expect(after.body[0].cost).toBe(4.5);
  });

  it("validates, creates and deduplicates webhook orders", async () => {
    const payload = { id: "ORD-1", buyer: { buyerName: "Maria", buyerEmail: "maria@email.com" }, lineItems: [{ itemId: "P-1", itemName: "A", qty: 1, unitPrice: 10 }], totalAmount: 10, createdAt: "2025-02-10T10:00:00Z" };
    await request(app).post("/api/webhooks/generic-ecommerce/orders").send(payload).expect(201);
    await request(app).post("/api/webhooks/generic-ecommerce/orders").send(payload).expect(200);
    const list = await request(app).get("/api/orders").expect(200);
    expect(list.body).toHaveLength(1);
    await request(app).post("/api/webhooks/unknown/orders").send(payload).expect(404);
    await request(app).post("/api/webhooks/generic-ecommerce/orders").send({}).expect(400);
  });
});