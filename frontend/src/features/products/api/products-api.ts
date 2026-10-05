import { http } from "../../../shared/api/http-client";
export interface Product { id: string; sku: string; name: string; price: number; createdAt: string }
export interface CreateProduct { sku: string; name: string; price: number }
export const getProducts = () => http<Product[]>("/api/products");
export const createProduct = (data: CreateProduct) => http<Product>("/api/products", { method: "POST", body: JSON.stringify(data) });