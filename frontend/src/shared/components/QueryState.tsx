export function LoadingState() {
  return (
    <div className="p-8 text-center text-sm text-muted-foreground">
      Carregando...
    </div>
  );
}
export function ErrorState({
  message = "Não foi possível carregar os dados.",
}: {
  message?: string;
}) {
  return (
    <div className="p-8 text-center text-sm text-destructive">{message}</div>
  );
}
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
