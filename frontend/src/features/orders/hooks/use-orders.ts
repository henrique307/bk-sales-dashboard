import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orders-api";
export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchInterval: 5_000,
  });
