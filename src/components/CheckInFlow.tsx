"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MOODS, WEIGHING, offerSupport, suggestTool, type CheckIn, type Mood, type Tension, type Weighing } from "@/lib/checkin";
import { saveCheckIn, useCheckIns } from "@/lib/checkinStore";
import { dayKey } from "@/lib/days";
import { ChoiceChips } from "./ChoiceChips";
import { NextSteps } from "./NextSteps";
import { SuggestionCard } from "./SuggestionCard";
import { SupportCallout } from "./SupportCallout";
import { TensionScale } from "./TensionScale";

export function CheckInFlow() {
  const checkIns = useCheckIns();
  const [mood, setMood] = useState<Mood>();
  const [tension, setTension] = useState<Tension>();
  const [weighing, setWeighing] = useState<Weighing>();
  const [saved, setSaved] = useState<CheckIn | null>(null);

  const today = dayKey(new Date());
  const earlierToday = !saved && checkIns?.some((entry) => entry.day === today);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!mood || !tension) return;
    setSaved(saveCheckIn({ mood, tension, weighing }));
  }

  if (saved) return <CheckInResult checkIn={saved} />;

  return (
    <form className="checkin-form" onSubmit={submit}>
      {earlierToday && <p className="note">You already checked in today. Another one is welcome. Feelings move.</p>}

      <fieldset className="question">
        <legend className="question-title">How are you, honestly?</legend>
        <ChoiceChips label="Mood" options={MOODS} value={mood} onChange={setMood} />
      </fieldset>

      <fieldset className="question">
        <legend className="question-title">How tight is your body right now?</legend>
        <TensionScale value={tension} onChange={setTension} />
      </fieldset>

      <fieldset className="question">
        <legend className="question-title">
          What happened? <span className="optional">Optional</span>
        </legend>
        <ChoiceChips label="What happened" options={WEIGHING} value={weighing} onChange={setWeighing} optional />
      </fieldset>

      <div className="form-footer">
        <button type="submit" className="btn btn-block" disabled={!mood || !tension}>
          Save check-in
        </button>
        {(!mood || !tension) && (
          <p className="form-hint">{!mood ? "Pick a mood to continue." : "Pick a tension number to continue."}</p>
        )}
      </div>
    </form>
  );
}

function CheckInResult({ checkIn }: { checkIn: CheckIn }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [skipped, setSkipped] = useState(false);
  const support = offerSupport(checkIn);

  useEffect(() => heading.current?.focus(), []);

  return (
    <div className="result">
      <h2 ref={heading} tabIndex={-1} className="result-title">
        Checked in.
      </h2>
      <p className="screen-lede">
        You took a moment to name what happened. Try the suggested reset, or skip it and choose what would help next.
      </p>
      <div className="result-stack">
        {support && <SupportCallout />}
        <SuggestionCard
          suggestion={suggestTool(checkIn)}
          eyebrow={support ? "When you're ready" : "Suggested reset"}
        />
      </div>
      {skipped ? (
        <NextSteps heading="Skipped the reset. What would help instead?" />
      ) : (
        <button type="button" className="text-link link-button" onClick={() => setSkipped(true)}>
          Skip the reset, choose a next step
        </button>
      )}
      <div className="player-links">
        <Link href="/" className="text-link">
          Back to Today
        </Link>
      </div>
    </div>
  );
}
