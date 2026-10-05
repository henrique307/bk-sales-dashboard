interface ApiErrorBody {
  error?: { message?: string };
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    throw new Error(
      body.error?.message ?? "Não foi possível concluir a operação.",
    );
  }
  return response.json() as Promise<T>;
}
