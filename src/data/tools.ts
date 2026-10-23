// The six resets. Phase 3 adds each tool's guided steps; ids are stable because check-ins link to them.
export type ToolContext = "microaggression" | "fatigue" | "news";

export type Tool = {
  id: string;
  title: string;
  context: ToolContext;
  minutes: number;
  summary: string;
};

export const CONTEXTS: Record<ToolContext, { label: string; blurb: string }> = {
  microaggression: { label: "After a microaggression", blurb: "Settle the spike before you decide what to do with it." },
  fatigue: { label: "Racial battle fatigue", blurb: "For the slow build-up of carrying it every day." },
  news: { label: "Hard news days", blurb: "Come back to your own room after the feed." },
};

export const TOOLS: Tool[] = [
  {
    id: "physiological-sigh",
    title: "Physiological sigh",
    context: "microaggression",
    minutes: 2,
    summary: "Two inhales, one long exhale. The fastest way to bring your heart rate down.",
  },
  {
    id: "name-place-leave",
    title: "Name it, place it, leave it",
    context: "microaggression",
    minutes: 3,
    summary: "Say what happened, notice where it landed in your body, and set it down for now.",
  },
  {
    id: "breath-478",
    title: "4-7-8 breathing",
    context: "fatigue",
    minutes: 2,
    summary: "A long, slow exhale pattern for when you've been braced all day.",
  },
  {
    id: "shoulders-jaw",
    title: "Shoulders and jaw release",
    context: "fatigue",
    minutes: 3,
    summary: "A short body scan for the places that hold the day.",
  },
  {
    id: "five-senses",
    title: "5-4-3-2-1 grounding",
    context: "news",
    minutes: 3,
    summary: "Use what you can see, hear, and touch to come back to the room you're in.",
  },
  {
    id: "close-the-feed",
    title: "Close the feed",
    context: "news",
    minutes: 3,
    summary: "A small ritual for putting the phone down after too much.",
  },
];

export function getTool(id: string): Tool | undefined {
  return TOOLS.find((tool) => tool.id === id);
}
