"use client";

import type { CheckIn } from "./checkin";
import { addDays, dayKey, type DayKey } from "./days";
import { parseJson, readKey, useStoredJson, writeKey } from "./localStore";

const KEY = "harbor-checkins-v1";

function load(): CheckIn[] {
  const parsed = parseJson<unknown>(readKey(KEY), []);
  return Array.isArray(parsed) ? (parsed as CheckIn[]) : [];
}

/** Check-ins, oldest first, or null during server render and before hydration. */
export function useCheckIns(): CheckIn[] | null {
  const parsed = useStoredJson<unknown>(KEY, []);
  if (parsed === null) return null;
  return Array.isArray(parsed) ? (parsed as CheckIn[]) : [];
}

export function saveCheckIn(entry: Omit<CheckIn, "id" | "at" | "day">, now = new Date()): CheckIn {
  const checkIn: CheckIn = { ...entry, id: crypto.randomUUID(), at: now.toISOString(), day: dayKey(now) };
  writeKey(KEY, JSON.stringify([...load(), checkIn]));
  return checkIn;
}

export function exportCheckIns(): string {
  return JSON.stringify(load(), null, 2);
}

// For the stage demo: ten days of history with one grace day, so the streak isn't empty on first open.
export function seedDemoHistory(now = new Date()) {
  const today = dayKey(now);
  const skipped = new Set([3]);
  const sample = [
    { mood: "low", tension: 4, weighing: "work" },
    { mood: "okay", tension: 3, weighing: "news" },
    { mood: "steady", tension: 2 },
    { mood: "heavy", tension: 4, weighing: "healthcare" },
    { mood: "okay", tension: 3, weighing: "tired" },
  ] as const;
  const entries: CheckIn[] = [];
  for (let back = 10; back >= 1; back -= 1) {
    if (skipped.has(back)) continue;
    const day: DayKey = addDays(today, -back);
    entries.push({ ...sample[back % sample.length], id: `demo-${day}`, at: `${day}T18:00:00.000Z`, day });
  }
  writeKey(KEY, JSON.stringify(entries));
}
