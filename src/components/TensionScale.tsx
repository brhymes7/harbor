"use client";

import { TENSION_LEVELS, type Tension } from "@/lib/checkin";
import { useRovingFocus } from "./useRovingFocus";

export function TensionScale({ value, onChange }: { value: Tension | undefined; onChange: (value: Tension) => void }) {
  const roving = useRovingFocus(TENSION_LEVELS.length, value ? value - 1 : -1);
  const selected = TENSION_LEVELS.find((level) => level.value === value);
  return (
    <>
      <div role="radiogroup" aria-label="Body tension" className="scale">
        {TENSION_LEVELS.map((level, index) => (
          <button
            key={level.value}
            type="button"
            role="radio"
            aria-checked={level.value === value}
            aria-label={`${level.value} of 5, ${level.label}`}
            className="scale-cell"
            onClick={() => onChange(level.value)}
            {...roving(index)}
          >
            {level.value}
          </button>
        ))}
      </div>
      <div className="scale-ends" aria-hidden="true">
        <span>Loose</span>
        <span>{"Can't settle"}</span>
      </div>
      <p className="scale-caption" aria-live="polite">
        {selected ? (
          <>
            <strong>{selected.label}.</strong> {selected.hint}
          </>
        ) : (
          "Pick the number that matches your body, not your thoughts."
        )}
      </p>
    </>
  );
}
