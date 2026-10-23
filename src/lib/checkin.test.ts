import { describe, expect, it } from "vitest";
import { TOOLS } from "../data/tools";
import { WEIGHING, offerSupport, suggestTool } from "./checkin";

describe("suggestTool", () => {
  it("routes every weighing option to a real tool", () => {
    const ids = new Set(TOOLS.map((tool) => tool.id));
    for (const { id } of WEIGHING) {
      expect(ids.has(suggestTool({ tension: 3, weighing: id }).toolId)).toBe(true);
    }
  });

  it("sends work to the microaggression reset and news to grounding", () => {
    expect(suggestTool({ tension: 2, weighing: "work" }).toolId).toBe("physiological-sigh");
    expect(suggestTool({ tension: 2, weighing: "news" }).toolId).toBe("five-senses");
  });

  it("uses tension when nothing is picked", () => {
    expect(suggestTool({ tension: 4 }).toolId).toBe("physiological-sigh");
    expect(suggestTool({ tension: 2 }).toolId).toBe("shoulders-jaw");
  });
});

describe("offerSupport", () => {
  it("triggers at can't-settle tension with a heavy or low mood", () => {
    expect(offerSupport({ mood: "heavy", tension: 5 })).toBe(true);
    expect(offerSupport({ mood: "low", tension: 5 })).toBe(true);
  });

  it("stays quiet below the threshold or with a steadier mood", () => {
    expect(offerSupport({ mood: "heavy", tension: 4 })).toBe(false);
    expect(offerSupport({ mood: "okay", tension: 5 })).toBe(false);
  });
});
