import { describe, expect, it } from "vitest";
import { totalMs } from "../lib/breath";
import { TOOLS } from "./tools";

describe("tools", () => {
  it("has six tools with unique ids, two per context", () => {
    expect(new Set(TOOLS.map((tool) => tool.id)).size).toBe(6);
    for (const context of ["microaggression", "fatigue", "news"]) {
      expect(TOOLS.filter((tool) => tool.context === context)).toHaveLength(2);
    }
  });

  it("keeps the timed breathing inside each tool's advertised minutes", () => {
    for (const tool of TOOLS) {
      const breathMs = tool.steps.reduce(
        (sum, step) => sum + (step.kind === "breath" ? totalMs(step.pattern, step.cycles) : 0),
        0,
      );
      expect(breathMs, tool.id).toBeLessThanOrEqual(tool.minutes * 60_000);
      expect(tool.steps.length, tool.id).toBeGreaterThan(1);
    }
  });
});
