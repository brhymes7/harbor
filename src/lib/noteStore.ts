"use client";

import { parseJson, readKey, useStoredJson, writeKey } from "./localStore";

// Private reflections. Like everything else in Harbor, they never leave this browser.
const KEY = "harbor-notes-v1";

export type Note = { id: string; at: string; text: string };

function load(): Note[] {
  const parsed = parseJson<unknown>(readKey(KEY), []);
  return Array.isArray(parsed) ? (parsed as Note[]) : [];
}

export function useNotes(): Note[] | null {
  const parsed = useStoredJson<unknown>(KEY, []);
  if (parsed === null) return null;
  return Array.isArray(parsed) ? (parsed as Note[]) : [];
}

export function saveNote(text: string, now = new Date()): Note {
  const note: Note = { id: crypto.randomUUID(), at: now.toISOString(), text };
  writeKey(KEY, JSON.stringify([...load(), note]));
  return note;
}

export function loadNotes(): Note[] {
  return load();
}
