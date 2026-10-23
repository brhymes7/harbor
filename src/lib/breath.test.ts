import { describe, expect, it } from "vitest";
import { breathStateAt, totalMs, type BreathPattern } from "./breath";

const FOUR_SEVEN_EIGHT: BreathPattern = [
  { phase: "in", ms: 4000 },
  { phase: "hold", ms: 7000 },
  { phase: "out", ms: 8000 },
];

const SIGH: BreathPattern = [
  { phase: "in", ms: 2000 },
  { phase: "top-up", ms: 1000 },
  { phase: "out", ms: 6000 },
];

describe("breathStateAt", () => {
  it("adds up the whole session", () => {
    expect(totalMs(FOUR_SEVEN_EIGHT, 4)).toBe(76_000);
    expect(totalMs(SIGH, 8)).toBe(72_000);
  });

  it("starts on the first inhale", () => {
    expect(breathStateAt(FOUR_SEVEN_EIGHT, 4, 0)).toEqual({
      status: "running",
      phase: "in",
      phaseMs: 4000,
      cycle: 1,
      secondsLeft: 4,
    });
  });

  it("moves to the next phase exactly at its boundary", () => {
    expect(breathStateAt(FOUR_SEVEN_EIGHT, 4, 3999)).toMatchObject({ phase: "in", secondsLeft: 1 });
    expect(breathStateAt(FOUR_SEVEN_EIGHT, 4, 4000)).toMatchObject({ phase: "hold", secondsLeft: 7 });
    expect(breathStateAt(FOUR_SEVEN_EIGHT, 4, 11_000)).toMatchObject({ phase: "out", secondsLeft: 8 });
  });

  it("counts cycles", () => {
    expect(breathStateAt(FOUR_SEVEN_EIGHT, 4, 19_000)).toMatchObject({ phase: "in", cycle: 2 });
    expect(breathStateAt(SIGH, 8, 2500)).toMatchObject({ phase: "top-up", cycle: 1 });
    expect(breathStateAt(SIGH, 8, 71_999)).toMatchObject({ phase: "out", cycle: 8, secondsLeft: 1 });
  });

  it("finishes after the last exhale", () => {
    expect(breathStateAt(SIGH, 8, 72_000)).toEqual({ status: "done" });
  });
});
