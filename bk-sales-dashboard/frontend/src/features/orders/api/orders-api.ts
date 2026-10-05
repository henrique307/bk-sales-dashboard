import { http } from "../../../shared/api/http-client";
export interface OrderItem { sku: string; name: string; quantity: number; unitPrice: number; subtotal: number }
export interface Order { id: string; externalId: string; source: string; customer: { name: string; email: string }; items: OrderItem[]; total: number; createdAt: string }
export const getOrders = () => http<Order[]>("/api/orders");