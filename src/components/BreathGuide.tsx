"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PHASE_LABEL, breathStateAt, type BreathPattern, type BreathState } from "@/lib/breath";

// Runs one timed breathing segment and calls onDone when the last exhale ends.
export function BreathGuide({
  pattern,
  cycles,
  onDone,
}: {
  pattern: BreathPattern;
  cycles: number;
  onDone: () => void;
}) {
  const [state, setState] = useState<BreathState | null>(null);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let start = 0;
    let timer = 0;
    // Wait one frame so the orb paints at rest before its first inhale transition starts.
    const frame = requestAnimationFrame(() => {
      start = performance.now();
      const tick = () => {
        const next = breathStateAt(pattern, cycles, performance.now() - start);
        if (next.status === "done") {
          window.clearInterval(timer);
          done.current();
          return;
        }
        setState((prev) =>
          prev?.status === "running" &&
          prev.phase === next.phase &&
          prev.cycle === next.cycle &&
          prev.secondsLeft === next.secondsLeft
            ? prev
            : next,
        );
      };
      tick();
      timer = window.setInterval(tick, 200);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, [pattern, cycles]);

  const running = state?.status === "running" ? state : null;

  return (
    <div className="breath">
      <div
        className="breath-orb"
        data-phase={running?.phase}
        style={{ "--phase-ms": `${running?.phaseMs ?? 0}ms` } as CSSProperties}
        aria-hidden="true"
      >
        <span className="breath-count">{running?.secondsLeft}</span>
      </div>
      <p className="breath-label" aria-live="polite">
        {running ? PHASE_LABEL[running.phase] : "Get ready"}
      </p>
      <p className="breath-cycle">{running ? `Breath ${running.cycle} of ${cycles}` : " "}</p>
    </div>
  );
}
