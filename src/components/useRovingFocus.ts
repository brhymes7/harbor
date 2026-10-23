import { useRef, useState, type KeyboardEvent } from "react";

const MOVES: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (index) => index + 1,
  ArrowDown: (index) => index + 1,
  ArrowLeft: (index) => index - 1,
  ArrowUp: (index) => index - 1,
  Home: () => 0,
  End: (_, count) => count - 1,
};

// Arrow keys move focus through a radiogroup; Space or Enter (native button behaviour) selects.
export function useRovingFocus(count: number, selectedIndex: number) {
  const items = useRef<(HTMLElement | null)[]>([]);
  const [focused, setFocused] = useState(-1);
  const active = focused >= 0 && focused < count ? focused : Math.max(selectedIndex, 0);

  return (index: number) => ({
    ref: (element: HTMLElement | null) => {
      items.current[index] = element;
    },
    tabIndex: index === active ? 0 : -1,
    onFocus: () => setFocused(index),
    onKeyDown: (event: KeyboardEvent) => {
      const move = MOVES[event.key];
      if (!move) return;
      event.preventDefault();
      const next = (move(index, count) + count) % count;
      setFocused(next);
      items.current[next]?.focus();
    },
  });
}
