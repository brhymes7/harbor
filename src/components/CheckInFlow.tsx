"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MOODS, WEIGHING, offerSupport, suggestTool, type CheckIn, type Mood, type Tension, type Weighing } from "@/lib/checkin";
import { saveCheckIn, useCheckIns } from "@/lib/checkinStore";
import { dayKey } from "@/lib/days";
import { computeStreak } from "@/lib/streak";
import { ChoiceChips } from "./ChoiceChips";
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

  if (saved) return <CheckInResult checkIn={saved} days={[...(checkIns ?? []).map((entry) => entry.day), saved.day]} />;

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
          {"What's weighing on you?"} <span className="optional">Optional</span>
        </legend>
        <ChoiceChips label="What's weighing on you" options={WEIGHING} value={weighing} onChange={setWeighing} optional />
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

function CheckInResult({ checkIn, days }: { checkIn: CheckIn; days: string[] }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const streak = computeStreak(days, checkIn.day);
  const support = offerSupport(checkIn);

  useEffect(() => heading.current?.focus(), []);

  const line =
    streak.totalDays === 1
      ? "That's your first one. Come back tomorrow and it becomes a rhythm."
      : streak.run === 1
        ? `Welcome back. All ${streak.totalDays} of your check-in days still count.`
        : `That's ${streak.run} days in a row of showing up for yourself.`;

  return (
    <div className="result">
      <h2 ref={heading} tabIndex={-1} className="result-title">
        Checked in.
      </h2>
      <p className="screen-lede">{line}</p>
      <div className="result-stack">
        {support && <SupportCallout />}
        <SuggestionCard
          suggestion={suggestTool(checkIn)}
          eyebrow={support ? "When you're ready" : "Suggested reset"}
        />
      </div>
      <Link href="/" className="text-link">
        Back to Today
      </Link>
    </div>
  );
}
