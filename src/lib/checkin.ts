import type { DayKey } from "./days";

export const MOODS = [
  { id: "heavy", label: "Heavy" },
  { id: "low", label: "Low" },
  { id: "okay", label: "Okay" },
  { id: "steady", label: "Steady" },
  { id: "good", label: "Good" },
] as const;

export const TENSION_LEVELS = [
  { value: 1, label: "Loose", hint: "My body feels at ease." },
  { value: 2, label: "Mostly settled", hint: "A little held, nothing loud." },
  { value: 3, label: "Some tightness", hint: "I can feel it in my shoulders, jaw, or chest." },
  { value: 4, label: "Wound up", hint: "My body is braced and it's hard to let go." },
  { value: 5, label: "Can't settle", hint: "It's taking over. I need support now." },
] as const;

export const WEIGHING = [
  { id: "work", label: "Work" },
  { id: "news", label: "The news" },
  { id: "healthcare", label: "Health care" },
  { id: "family", label: "Family" },
  { id: "money", label: "Money" },
  { id: "tired", label: "Just tired" },
] as const;

export type Mood = (typeof MOODS)[number]["id"];
export type Tension = (typeof TENSION_LEVELS)[number]["value"];
export type Weighing = (typeof WEIGHING)[number]["id"];

export type CheckIn = {
  id: string;
  at: string;
  day: DayKey;
  mood: Mood;
  tension: Tension;
  weighing?: Weighing;
};

export type Suggestion = { toolId: string; reason: string };

// What's weighing on someone picks the context; tension breaks ties when they skip that question.
const BY_WEIGHING: Record<Weighing, Suggestion> = {
  work: { toolId: "physiological-sigh", reason: "Work came up. This brings your heart rate down fast." },
  healthcare: {
    toolId: "name-place-leave",
    reason: "Being dismissed by care you need is its own weight. This helps you set it down.",
  },
  news: { toolId: "five-senses", reason: "The news came up. This brings you back to the room you're in." },
  family: { toolId: "breath-478", reason: "Family can be heavy to carry. This slows everything down." },
  money: { toolId: "breath-478", reason: "Money stress keeps the body braced. This slows everything down." },
  tired: { toolId: "shoulders-jaw", reason: "Tired usually lives in the shoulders and jaw. Start there." },
};

export function suggestTool(checkIn: Pick<CheckIn, "tension" | "weighing">): Suggestion {
  if (checkIn.weighing) return BY_WEIGHING[checkIn.weighing];
  if (checkIn.tension >= 4) {
    return { toolId: "physiological-sigh", reason: "Your body is wound up. This is the quickest way down." };
  }
  return { toolId: "shoulders-jaw", reason: "A short check of where today is sitting in your body." };
}

// Can't-settle tension with a heavy or low mood puts crisis support first, before any exercise.
export function offerSupport(checkIn: Pick<CheckIn, "mood" | "tension">): boolean {
  return checkIn.tension === 5 && (checkIn.mood === "heavy" || checkIn.mood === "low");
}
