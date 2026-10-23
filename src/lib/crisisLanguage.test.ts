import { describe, expect, it } from "vitest";
import { mentionsCrisis } from "./crisisLanguage";

describe("mentionsCrisis", () => {
  it.each([
    "I want to kill myself",
    "honestly I've been feeling suicidal",
    "I just want to end it all",
    "I don’t want to be here anymore",
    "everyone would be better off without me",
    "thinking about hurting myself",
  ])("flags %s", (text) => {
    expect(mentionsCrisis(text)).toBe(true);
  });

  it.each([
    "That meeting killed me, I'm exhausted",
    "I want to end this week on a good note",
    "Didn't sleep, didn't shower, did check in here",
    "the shift was a nightmare",
  ])("leaves %s alone", (text) => {
    expect(mentionsCrisis(text)).toBe(false);
  });
});
