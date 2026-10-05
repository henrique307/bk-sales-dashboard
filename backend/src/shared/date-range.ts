export interface DateRange {
  start?: Date;
  end?: Date;
}

export function toDateRange(startDate?: string, endDate?: string): DateRange {
  return {
    start: startDate ? new Date(`${startDate}T00:00:00.000Z`) : undefined,
    end: endDate ? new Date(`${endDate}T23:59:59.999Z`) : undefined,
  };
}

export function isWithinRange(date: Date, range: DateRange = {}): boolean {
  if (range.start && date < range.start) return false;
  if (range.end && date > range.end) return false;
  return true;
}
