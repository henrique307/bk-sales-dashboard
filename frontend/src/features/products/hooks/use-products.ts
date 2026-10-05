import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts, type CreateProduct } from "../api/products-api";
export const useProducts = () => useQuery({ queryKey: ["products"], queryFn: getProducts });
export function useCreateProduct() { const client = useQueryClient(); return useMutation({ mutationFn: (data: CreateProduct) => createProduct(data), onSuccess: async () => { await Promise.all([client.invalidateQueries({ queryKey: ["products"] }), client.invalidateQueries({ queryKey: ["product-costs"] })]); } }); }