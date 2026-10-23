// A breathing pattern is a list of timed phases repeated for some cycles. "top-up" is the second,
// shorter inhale of a physiological sigh.
export type BreathPhase = "in" | "top-up" | "hold" | "out";

export type BreathPattern = ReadonlyArray<{ phase: BreathPhase; ms: number }>;

export type BreathState =
  | { status: "running"; phase: BreathPhase; phaseMs: number; cycle: number; secondsLeft: number }
  | { status: "done" };

export function patternMs(pattern: BreathPattern): number {
  return pattern.reduce((sum, step) => sum + step.ms, 0);
}

export function totalMs(pattern: BreathPattern, cycles: number): number {
  return patternMs(pattern) * cycles;
}

export function breathStateAt(pattern: BreathPattern, cycles: number, elapsedMs: number): BreathState {
  if (elapsedMs >= totalMs(pattern, cycles)) return { status: "done" };
  const elapsed = Math.max(0, elapsedMs);
  const cycleMs = patternMs(pattern);
  let into = elapsed % cycleMs;
  for (const step of pattern) {
    if (into < step.ms) {
      return {
        status: "running",
        phase: step.phase,
        phaseMs: step.ms,
        cycle: Math.floor(elapsed / cycleMs) + 1,
        secondsLeft: Math.ceil((step.ms - into) / 1000),
      };
    }
    into -= step.ms;
  }
  throw new Error("unreachable: elapsed time fell outside the pattern");
}

export const PHASE_LABEL: Record<BreathPhase, string> = {
  in: "Breathe in",
  "top-up": "One more sip in",
  hold: "Hold",
  out: "Breathe out slowly",
};
