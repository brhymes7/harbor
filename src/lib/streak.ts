import { addDays, weekStart, type DayKey } from "./days";

export type Streak = {
  /** Consecutive days shown up, bridging at most one missed day per Monday–Sunday week. */
  run: number;
  /** Every distinct day with a check-in. It never goes down. */
  totalDays: number;
  checkedInToday: boolean;
  /** Missed days the grace rule bridged inside the current run. */
  graceDays: DayKey[];
  graceAvailableThisWeek: boolean;
};

/*
  Shame-free by design: today is never counted as missed until it's over, one missed day a week is
  forgiven automatically, and a broken run resets quietly while totalDays keeps every day that counted.
*/
export function computeStreak(days: Iterable<DayKey>, today: DayKey): Streak {
  const shown = new Set(days);
  const checkedInToday = shown.has(today);
  const graceWeeks = new Set<DayKey>();
  const graceDays: DayKey[] = [];

  let run = 0;
  let cursor = checkedInToday ? today : addDays(today, -1);
  for (;;) {
    if (shown.has(cursor)) {
      run += 1;
    } else {
      const week = weekStart(cursor);
      const bridgeable = shown.has(addDays(cursor, -1)) && !graceWeeks.has(week);
      if (!bridgeable) break;
      graceWeeks.add(week);
      graceDays.push(cursor);
    }
    cursor = addDays(cursor, -1);
  }

  return {
    run,
    totalDays: shown.size,
    checkedInToday,
    graceDays,
    graceAvailableThisWeek: !graceWeeks.has(weekStart(today)),
  };
}
