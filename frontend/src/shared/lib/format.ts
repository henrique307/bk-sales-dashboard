const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const date = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });
export const formatCurrency = (value: number) => currency.format(value);
export const formatDate = (value: string) => date.format(new Date(value));
