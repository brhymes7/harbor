"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CONTEXTS, type Tool } from "@/data/tools";
import { BreathGuide } from "./BreathGuide";
import { ChoiceChips } from "./ChoiceChips";
import { SupportCallout } from "./SupportCallout";

const AFTER = [
  { id: "lighter", label: "A little lighter" },
  { id: "same", label: "About the same" },
  { id: "heavier", label: "Heavier" },
] as const;

type After = (typeof AFTER)[number]["id"];

// Keeps the phone screen on while a reset runs, where the browser supports it.
function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active || !("wakeLock" in navigator)) return;
    let lock: WakeLockSentinel | undefined;
    navigator.wakeLock
      .request("screen")
      .then((sentinel) => (lock = sentinel))
      .catch(() => {});
    return () => {
      lock?.release().catch(() => {});
    };
  }, [active]);
}

export function ToolPlayer({ tool }: { tool: Tool }) {
  // -1 is the intro, steps.length is the closing check.
  const [index, setIndex] = useState(-1);
  const [after, setAfter] = useState<After>();
  const heading = useRef<HTMLHeadingElement>(null);
  const total = tool.steps.length;
  const step = tool.steps[index];
  const finished = index >= total;

  useWakeLock(index >= 0 && !finished);

  useEffect(() => {
    if (index >= 0) heading.current?.focus();
  }, [index]);

  const next = () => setIndex((current) => current + 1);

  return (
    <div className="player">
      <div className="player-bar">
        {index >= 0 && !finished ? (
          <ol className="progress" aria-label={`Step ${index + 1} of ${total}`}>
            {tool.steps.map((_, i) => (
              <li key={i} data-state={i < index ? "done" : i === index ? "current" : "todo"} />
            ))}
          </ol>
        ) : (
          <span />
        )}
        <Link href="/tools" className="icon-button" aria-label="End this reset">
          <X size={22} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>

      {index < 0 && (
        <div className="player-body">
          <p className="eyebrow">
            {CONTEXTS[tool.context].label} · {tool.minutes} min
          </p>
          <h1 className="screen-title">{tool.title}</h1>
          <p className="screen-lede">{tool.summary}</p>
          <div className="player-actions">
            <button type="button" className="btn btn-block" onClick={next}>
              Begin the {tool.minutes}-minute reset
            </button>
          </div>
        </div>
      )}

      {step && (
        <div className="player-body" key={index}>
          <p className="eyebrow">
            Step {index + 1} of {total}
          </p>
          <h1 ref={heading} tabIndex={-1} className="step-title">
            {step.title}
          </h1>
          {step.kind === "prompt" ? (
            <>
              <p className="step-body">{step.body}</p>
              <div className="player-actions">
                <button type="button" className="btn btn-block" onClick={next}>
                  {index === total - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <>
              <BreathGuide pattern={step.pattern} cycles={step.cycles} onDone={next} />
              <div className="player-actions">
                <button type="button" className="text-link player-skip" onClick={next}>
                  Skip the breathing
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {finished && (
        <div className="player-body">
          <h1 ref={heading} tabIndex={-1} className="step-title">
            How does your body feel now?
          </h1>
          <div className="after">
            <ChoiceChips label="How you feel now" options={AFTER} value={after} onChange={setAfter} />
          </div>
          {after === "lighter" && (
            <p className="step-body after-reply">
              That&apos;s your nervous system doing its job. This reset is here whenever you need it again.
            </p>
          )}
          {after === "same" && (
            <p className="step-body after-reply">
              That&apos;s okay. Some days need more than one round. Try another reset, or come back to this later.
            </p>
          )}
          {after === "heavier" && (
            <div className="after-reply">
              <SupportCallout />
            </div>
          )}
          {after && (
            <div className="player-links">
              <Link href="/" className="btn btn-block">
                Back to Today
              </Link>
              <Link href="/tools" className="text-link">
                See all resets
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
