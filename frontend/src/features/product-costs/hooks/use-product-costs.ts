import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductCosts, saveProductCost } from "../api/product-costs-api";
export const useProductCosts = () => useQuery({ queryKey: ["product-costs"], queryFn: getProductCosts });
export function useSaveProductCost() {
  const client = useQueryClient();
  return useMutation({ mutationFn: ({ productId, cost }: { productId: string; cost: number }) => saveProductCost(productId, cost), onSuccess: async () => { await Promise.all([client.invalidateQueries({ queryKey: ["product-costs"] }), client.invalidateQueries({ queryKey: ["dashboard"] })]); } });
}