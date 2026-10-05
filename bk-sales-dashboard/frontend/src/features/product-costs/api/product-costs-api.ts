import { http } from "../../../shared/api/http-client";
export interface ProductCost { productId: string; sku: string; name: string; cost: number | null; updatedAt: string | null }
export const getProductCosts = () => http<ProductCost[]>("/api/product-costs");
export const saveProductCost = (productId: string, cost: number) => http(`/api/product-costs/${productId}`, { method: "PUT", body: JSON.stringify({ cost }) });