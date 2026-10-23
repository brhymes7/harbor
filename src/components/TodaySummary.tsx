"use client";

import Link from "next/link";
import { useEffect } from "react";
import { offerSupport, suggestTool } from "@/lib/checkin";
import { seedDemoHistory, useCheckIns } from "@/lib/checkinStore";
import { dayKey } from "@/lib/days";
import { computeStreak } from "@/lib/streak";
import { StreakCard } from "./StreakCard";
import { SuggestionCard } from "./SuggestionCard";
import { SupportCallout } from "./SupportCallout";

export function TodaySummary() {
  const checkIns = useCheckIns();

  // `/?demo=seed` loads sample history for the stage demo, then cleans the URL.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("demo") !== "seed") return;
    seedDemoHistory();
    url.searchParams.delete("demo");
    window.history.replaceState(null, "", url.pathname + url.search);
  }, []);

  if (!checkIns) return <div className="card streak streak-loading" aria-hidden="true" />;

  const today = dayKey(new Date());
  const days = new Set(checkIns.map((entry) => entry.day));
  const streak = computeStreak(days, today);
  const latestToday = checkIns.findLast((entry) => entry.day === today);

  return (
    <div className="today">
      <StreakCard streak={streak} days={days} today={today} />
      {latestToday ? (
        <>
          {offerSupport(latestToday) && <SupportCallout />}
          <SuggestionCard suggestion={suggestTool(latestToday)} eyebrow="From today's check-in" />
          <Link href="/check-in" className="text-link">
            Check in again
          </Link>
        </>
      ) : (
        <div className="today-cta">
          <p className="card-body">
            {checkIns.length === 0
              ? "Start with a 20-second check-in. We'll point you to the right reset."
              : "You haven't checked in today. It takes about 20 seconds."}
          </p>
          <Link href="/check-in" className="btn btn-block">
            Start today&apos;s check-in
          </Link>
        </div>
      )}
    </div>
  );
}
