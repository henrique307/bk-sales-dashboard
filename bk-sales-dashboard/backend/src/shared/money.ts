// Rounding avoids float artefacts such as 49.9 * 100 = 4989.999...
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}
