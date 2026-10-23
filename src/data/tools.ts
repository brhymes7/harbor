import type { BreathPattern } from "../lib/breath";

// The six resets. Ids are stable because check-ins link to them.
// Copy rules: plain words, no clinical claims, and never ask anyone to minimize what happened to them.
export type ToolContext = "microaggression" | "fatigue" | "news";

export type ToolStep =
  | { kind: "prompt"; title: string; body: string }
  | { kind: "breath"; title: string; pattern: BreathPattern; cycles: number };

export type Tool = {
  id: string;
  title: string;
  context: ToolContext;
  minutes: number;
  summary: string;
  steps: ToolStep[];
};

export const CONTEXTS: Record<ToolContext, { label: string; blurb: string }> = {
  microaggression: { label: "After a microaggression", blurb: "Settle the spike before you decide what to do with it." },
  fatigue: { label: "Racial battle fatigue", blurb: "For the slow build-up of carrying it every day." },
  news: { label: "Hard news days", blurb: "Come back to your own room after the feed." },
};

const SIGH: BreathPattern = [
  { phase: "in", ms: 2000 },
  { phase: "top-up", ms: 1000 },
  { phase: "out", ms: 6000 },
];

const FOUR_SEVEN_EIGHT: BreathPattern = [
  { phase: "in", ms: 4000 },
  { phase: "hold", ms: 7000 },
  { phase: "out", ms: 8000 },
];

const SLOW_EXHALE: BreathPattern = [
  { phase: "in", ms: 4000 },
  { phase: "out", ms: 6000 },
];

export const TOOLS: Tool[] = [
  {
    id: "physiological-sigh",
    title: "Physiological sigh",
    context: "microaggression",
    minutes: 2,
    summary: "Two inhales, one long exhale. One of the quickest ways to slow your breathing back down.",
    steps: [
      {
        kind: "prompt",
        title: "First, the body",
        body: "Let your feet find the floor. You don't have to figure out what just happened yet. Your body goes first.",
      },
      { kind: "breath", title: "Breathe in through your nose, then a second sip, then sigh it out", pattern: SIGH, cycles: 8 },
      {
        kind: "prompt",
        title: "Notice the difference",
        body: "Check your heartbeat and your shoulders. You can decide what to do about what happened later, with a clearer head. That choice is yours.",
      },
    ],
  },
  {
    id: "name-place-leave",
    title: "Name it, place it, leave it",
    context: "microaggression",
    minutes: 3,
    summary: "Say what happened, notice where it landed in your body, and set it down for now.",
    steps: [
      {
        kind: "prompt",
        title: "Name it",
        body: "In a few plain words, say to yourself what happened. Not why, just what. \"He talked over me again.\" \"She asked where I'm really from.\"",
      },
      {
        kind: "prompt",
        title: "Name the feeling",
        body: "Angry. Embarrassed. Tired. Invisible. Whatever it is, it's a reasonable response to being treated that way.",
      },
      {
        kind: "prompt",
        title: "Place it",
        body: "Where did it land in your body? Jaw, chest, stomach, shoulders. If you can, rest a hand there.",
      },
      { kind: "breath", title: "Breathe slowly into that spot", pattern: SLOW_EXHALE, cycles: 4 },
      {
        kind: "prompt",
        title: "Leave it, for now",
        body: "You're not pretending it didn't happen. You're choosing when to deal with it. Picture setting it on a shelf you can come back to.",
      },
      {
        kind: "prompt",
        title: "That's enough for right now",
        body: "If you want to write it down or talk it through later, that's yours to decide. For this moment, you did enough.",
      },
    ],
  },
  {
    id: "breath-478",
    title: "4-7-8 breathing",
    context: "fatigue",
    minutes: 2,
    summary: "A long, slow exhale pattern for when you've been braced all day.",
    steps: [
      {
        kind: "prompt",
        title: "Get settled",
        body: "Sit back or lie down. This pattern stretches the exhale. If the hold feels like too much, shorten it. There's no wrong way to do this.",
      },
      { kind: "breath", title: "In for 4, hold for 7, out for 8", pattern: FOUR_SEVEN_EIGHT, cycles: 4 },
      {
        kind: "prompt",
        title: "Let it go back to normal",
        body: "Let your breathing find its own pace again. Notice anything that softened, even a little.",
      },
    ],
  },
  {
    id: "shoulders-jaw",
    title: "Shoulders and jaw release",
    context: "fatigue",
    minutes: 3,
    summary: "A short body scan for the places that hold the day.",
    steps: [
      {
        kind: "prompt",
        title: "Your jaw",
        body: "Unclench it. Let your teeth part and your tongue rest. A lot of us hold the whole day right here.",
      },
      {
        kind: "prompt",
        title: "Your shoulders",
        body: "Let them drop away from your ears. Then drop them again. There's usually more.",
      },
      {
        kind: "prompt",
        title: "Your face",
        body: "Soften the space between your eyebrows. Your face can stop performing for a minute.",
      },
      {
        kind: "prompt",
        title: "Your hands",
        body: "Let them go heavy. Open your palms if you can.",
      },
      { kind: "breath", title: "Breathe into everything you just let go", pattern: SLOW_EXHALE, cycles: 4 },
      {
        kind: "prompt",
        title: "Rest is not falling behind",
        body: "Carrying this every day is real work. Taking a few minutes back is part of the work, not a break from it.",
      },
    ],
  },
  {
    id: "five-senses",
    title: "5-4-3-2-1 grounding",
    context: "news",
    minutes: 3,
    summary: "Use what you can see, hear, and touch to come back to the room you're in.",
    steps: [
      {
        kind: "prompt",
        title: "5 things you can see",
        body: "Look around slowly. Name five things, out loud or in your head. Notice their colors.",
      },
      {
        kind: "prompt",
        title: "4 things you can feel",
        body: "The chair under you. Your clothes on your skin. The air on your face. The ground under your feet.",
      },
      {
        kind: "prompt",
        title: "3 things you can hear",
        body: "Near and far. A fan, a car, your own breathing.",
      },
      {
        kind: "prompt",
        title: "2 things you can smell",
        body: "If nothing's there, think of two smells you love.",
      },
      {
        kind: "prompt",
        title: "1 thing you can taste",
        body: "Or take one slow sip of water.",
      },
      {
        kind: "prompt",
        title: "You're here",
        body: "What you read is real, and it matters. You're also here, in this room, right now. Both can be true.",
      },
    ],
  },
  {
    id: "close-the-feed",
    title: "Close the feed",
    context: "news",
    minutes: 3,
    summary: "A small ritual for putting the phone down after too much.",
    steps: [
      {
        kind: "prompt",
        title: "Notice what you took in",
        body: "You can care deeply about what happened and still close the app. Stay on this screen for the next two minutes. No other tabs.",
      },
      { kind: "breath", title: "Three slow breaths", pattern: SLOW_EXHALE, cycles: 3 },
      {
        kind: "prompt",
        title: "Say one true thing",
        body: "Say it the way you'd say it to a friend. \"It makes sense this hurts.\" \"I'm allowed to rest.\" \"I don't have to watch it again to care.\"",
      },
      {
        kind: "prompt",
        title: "Pick the next ten minutes",
        body: "Choose one small thing that isn't the news. Water, a stretch, stepping outside, texting someone you love.",
      },
      {
        kind: "prompt",
        title: "On your terms",
        body: "Staying informed is a choice you get to make on purpose. You can come back to it later, when you decide to.",
      },
    ],
  },
];

export function getTool(id: string): Tool | undefined {
  return TOOLS.find((tool) => tool.id === id);
}
