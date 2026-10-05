import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { z } from "zod";
import { Button } from "../../../shared/components/ui/button";
import { Dialog, DialogContent } from "../../../shared/components/ui/dialog";
import { Input } from "../../../shared/components/ui/input";
import { useCreateProduct } from "../hooks/use-products";

const schema = z.object({ sku: z.string().trim().min(1, "Informe o SKU"), name: z.string().trim().min(1, "Informe o nome"), price: z.coerce.number().positive("O preço deve ser maior que zero") });
type FormData = z.infer<typeof schema>;
export function ProductFormDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const mutation = useCreateProduct(); const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const close = () => { reset(); onOpenChange(false); };
  const submit = handleSubmit((data) => mutation.mutate(data, { onSuccess: close }));
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent title="Novo produto"><form className="grid gap-4" onSubmit={submit}>
    <Field label="SKU" error={errors.sku?.message}><Input placeholder="P-005" {...register("sku")} /></Field>
    <Field label="Nome" error={errors.name?.message}><Input placeholder="Nome do produto" {...register("name")} /></Field>
    <Field label="Preço" error={errors.price?.message}><Input type="number" min="0.01" step="0.01" placeholder="0,00" {...register("price")} /></Field>
    {mutation.error && <p className="text-sm text-destructive">{mutation.error.message}</p>}
    <div className="mt-2 flex justify-end gap-2"><Button type="button" variant="outline" onClick={close}>Cancelar</Button><Button type="submit" disabled={mutation.isPending}>Salvar produto</Button></div>
  </form></DialogContent></Dialog>;
}
function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) { return <label className="grid gap-1.5 text-sm font-medium">{label}{children}{error && <span className="text-xs text-destructive">{error}</span>}</label>; }