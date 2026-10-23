// Calendar days as "YYYY-MM-DD" in the person's own timezone, so a 11:58pm check-in counts for that night.
export type DayKey = string;

const pad = (n: number) => String(n).padStart(2, "0");

export function dayKey(date: Date): DayKey {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Day arithmetic runs in UTC so daylight-saving shifts never skip or repeat a day.
function toUtc(day: DayKey): Date {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function fromUtc(date: Date): DayKey {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

export function addDays(day: DayKey, amount: number): DayKey {
  const date = toUtc(day);
  date.setUTCDate(date.getUTCDate() + amount);
  return fromUtc(date);
}

// Weeks start on Monday; the Monday's key identifies the week.
export function weekStart(day: DayKey): DayKey {
  const offset = (toUtc(day).getUTCDay() + 6) % 7;
  return addDays(day, -offset);
}

export function weekDays(day: DayKey): DayKey[] {
  const monday = weekStart(day);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}
