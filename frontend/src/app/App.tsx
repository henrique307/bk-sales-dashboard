import { DashboardSection } from "../features/dashboard/components/DashboardSection";
import { OrdersSection } from "../features/orders/components/OrdersSection";
import { ProductCostsSection } from "../features/product-costs/components/ProductCostsSection";
import { ProductsSection } from "../features/products/components/ProductsSection";

export function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <h1 className="mt-1 text-2xl font-bold">
            Dashboard — Visão geral da sua loja
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe pedidos, resultados e custos dos produtos.
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <DashboardSection />
        <OrdersSection />
        <ProductCostsSection />
        <ProductsSection />
      </main>
    </div>
  );
}
