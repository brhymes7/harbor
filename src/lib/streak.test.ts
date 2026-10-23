import { describe, expect, it } from "vitest";
import { addDays, dayKey, weekDays, weekStart } from "./days";
import { computeStreak } from "./streak";

// 2026-10-22 is a Thursday; its week runs Mon 10-19 to Sun 10-25.
const THU = "2026-10-22";
const back = (n: number) => addDays(THU, -n);
const range = (from: number, to: number) => Array.from({ length: from - to + 1 }, (_, i) => back(from - i));

describe("days", () => {
  it("uses the local calendar day, so 11:59pm and 12:01am are different days", () => {
    expect(dayKey(new Date(2026, 9, 22, 23, 59))).toBe("2026-10-22");
    expect(dayKey(new Date(2026, 9, 23, 0, 1))).toBe("2026-10-23");
  });

  it("steps across month ends and the daylight-saving change", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(addDays("2026-11-02", -1)).toBe("2026-11-01");
    expect(addDays("2026-03-08", 1)).toBe("2026-03-09");
  });

  it("starts weeks on Monday", () => {
    expect(weekStart(THU)).toBe("2026-10-19");
    expect(weekStart("2026-10-25")).toBe("2026-10-19");
    expect(weekStart("2026-10-26")).toBe("2026-10-26");
    expect(weekDays(THU)).toHaveLength(7);
  });
});

describe("computeStreak", () => {
  it("is empty before the first check-in", () => {
    expect(computeStreak([], THU)).toMatchObject({ run: 0, totalDays: 0, checkedInToday: false });
  });

  it("counts consecutive days including today", () => {
    expect(computeStreak(range(4, 0), THU)).toMatchObject({ run: 5, totalDays: 5, checkedInToday: true });
  });

  it("doesn't treat today as missed before it's over", () => {
    const streak = computeStreak(range(3, 1), THU);
    expect(streak).toMatchObject({ run: 3, checkedInToday: false, graceAvailableThisWeek: true });
    expect(streak.graceDays).toEqual([]);
  });

  it("bridges a single missed day with the week's grace day", () => {
    // Shown Mon, Tue, Thu; missed Wed.
    const streak = computeStreak([back(3), back(2), THU], THU);
    expect(streak.run).toBe(3);
    expect(streak.graceDays).toEqual([back(1)]);
    expect(streak.graceAvailableThisWeek).toBe(false);
  });

  it("bridges yesterday when today's check-in hasn't happened yet", () => {
    expect(computeStreak([back(3), back(2)], THU)).toMatchObject({ run: 2, graceDays: [back(1)] });
  });

  it("stops at a second missed day in the same week", () => {
    // Week of 10-19, seen from Sunday: missed Fri 10-23 uses the grace day; missed Tue 10-20 is the second miss.
    const sun = "2026-10-25";
    const days = ["2026-10-19", "2026-10-21", "2026-10-22", "2026-10-24", sun];
    const streak = computeStreak(days, sun);
    expect(streak.graceDays).toEqual(["2026-10-23"]);
    expect(streak.run).toBe(4);
  });

  it("gives each week its own grace day", () => {
    // Missed Sat 10-17 (previous week) and Wed 10-21 (this week).
    const days = ["2026-10-15", "2026-10-16", "2026-10-18", "2026-10-19", "2026-10-20", THU];
    const streak = computeStreak(days, THU);
    expect(streak.graceDays).toEqual(["2026-10-21", "2026-10-17"]);
    expect(streak.run).toBe(6);
  });

  it("ends the run after two missed days in a row but keeps the total", () => {
    const streak = computeStreak([...range(9, 5), THU], THU);
    expect(streak.run).toBe(1);
    expect(streak.totalDays).toBe(6);
  });

  it("resets quietly to zero when the person has been away", () => {
    expect(computeStreak(range(12, 8), THU)).toMatchObject({ run: 0, totalDays: 5 });
  });

  it("ignores duplicate check-ins on the same day", () => {
    expect(computeStreak([THU, THU, back(1)], THU)).toMatchObject({ run: 2, totalDays: 2 });
  });
});
