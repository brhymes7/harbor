"use client";

import { useRovingFocus } from "./useRovingFocus";

type Option<T extends string> = { id: T; label: string };

// A single-choice radiogroup. When optional, tapping the chosen chip again clears it.
export function ChoiceChips<T extends string>({
  label,
  options,
  value,
  onChange,
  optional = false,
}: {
  label: string;
  options: readonly Option<T>[];
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  optional?: boolean;
}) {
  const roving = useRovingFocus(
    options.length,
    options.findIndex((option) => option.id === value),
  );
  return (
    <div role="radiogroup" aria-label={label} className="chips">
      {options.map((option, index) => {
        const checked = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={checked}
            className="chip"
            onClick={() => onChange(optional && checked ? undefined : option.id)}
            {...roving(index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
