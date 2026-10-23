"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { CheckIn } from "./checkin";
import { addDays, dayKey, type DayKey } from "./days";

// Everything lives in this browser's localStorage. There is no server copy.
const KEY = "harbor-checkins-v1";
const CHANGE = "harbor-checkins-change";

function read(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function write(value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, value);
  } catch {
    // Private browsing or a full quota: nothing is remembered, nothing breaks.
  }
  window.dispatchEvent(new Event(CHANGE));
}

function parse(raw: string | null): CheckIn[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? (parsed as CheckIn[]) : [];
  } catch {
    return [];
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Check-ins, oldest first, or null during server render and before hydration. */
export function useCheckIns(): CheckIn[] | null {
  const raw = useSyncExternalStore(subscribe, read, () => undefined);
  return useMemo(() => (raw === undefined ? null : parse(raw)), [raw]);
}

export function saveCheckIn(entry: Omit<CheckIn, "id" | "at" | "day">, now = new Date()): CheckIn {
  const checkIn: CheckIn = { ...entry, id: crypto.randomUUID(), at: now.toISOString(), day: dayKey(now) };
  write(JSON.stringify([...parse(read()), checkIn]));
  return checkIn;
}

export function clearCheckIns() {
  write(null);
}

export function exportCheckIns(): string {
  return JSON.stringify(parse(read()), null, 2);
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
  write(JSON.stringify(entries));
}
