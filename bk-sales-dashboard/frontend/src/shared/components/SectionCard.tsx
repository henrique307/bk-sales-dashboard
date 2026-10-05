import type { ReactNode } from "react";
export function SectionCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
    <header className="flex min-h-16 items-center justify-between gap-4 border-b px-5 py-4"><h2 className="font-semibold">{title}</h2>{action}</header>
    {children}
  </section>;
}