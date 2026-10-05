import { Dialog, DialogContent } from "../../../shared/components/ui/dialog";
import { formatCurrency, formatDate } from "../../../shared/lib/format";
import type { Order } from "../api/orders-api";

export function OrderDetailsDialog({ order, open, onOpenChange }: { order: Order | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}>{order && <DialogContent title={`Pedido ${order.externalId}`}>
    <div className="mb-5 grid gap-1 text-sm"><span className="font-medium">{order.customer.name}</span><span className="text-muted-foreground">{order.customer.email}</span><span className="text-muted-foreground">{formatDate(order.createdAt)}</span></div>
    <div className="divide-y rounded-md border">{order.items.map((item) => <div className="grid grid-cols-[1fr_auto] gap-3 p-3 text-sm" key={`${item.sku}-${item.name}`}><div><p className="font-medium">{item.name}</p><p className="text-muted-foreground">{item.quantity} × {formatCurrency(item.unitPrice)}</p></div><span className="font-medium">{formatCurrency(item.subtotal)}</span></div>)}</div>
    <div className="mt-4 flex justify-between border-t pt-4 font-semibold"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
  </DialogContent>}</Dialog>;
}