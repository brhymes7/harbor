"use client";

import { useMemo, useSyncExternalStore } from "react";

// Harbor keeps everything in this browser's localStorage under "harbor-" keys. There is no server copy.
export const KEY_PREFIX = "harbor-";
const CHANGE = "harbor-storage-change";

export function readKey(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeKey(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Private browsing or a full quota: nothing is remembered, nothing breaks.
  }
  window.dispatchEvent(new Event(CHANGE));
}

export function parseJson<T>(raw: string | null, fallback: T): T {
  try {
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
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

/** The parsed value under `key`, or null during server render and before hydration. */
export function useStoredJson<T>(key: string, fallback: T): T | null {
  const raw = useSyncExternalStore(subscribe, () => readKey(key), () => undefined);
  // The fallback is a fresh literal each render, so it stays out of the dependency list on purpose.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => (raw === undefined ? null : parseJson(raw, fallback)), [raw]);
}

export function clearAll() {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(KEY_PREFIX))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Nothing to clear if storage is unavailable.
  }
  window.dispatchEvent(new Event(CHANGE));
}
