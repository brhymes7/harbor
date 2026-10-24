"use client";

import Link from "next/link";
import { useEffect } from "react";
import { offerSupport, suggestTool } from "@/lib/checkin";
import { seedDemoHistory, useCheckIns } from "@/lib/checkinStore";
import { dayKey } from "@/lib/days";
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
  const latestToday = checkIns.findLast((entry) => entry.day === today);

  return (
    <div className="today">
      {latestToday ? (
        <>
          {offerSupport(latestToday) && <SupportCallout />}
          <SuggestionCard suggestion={suggestTool(latestToday)} eyebrow="From today's check-in" />
          <Link href="/check-in" className="text-link">
            Something else happened? Check in again
          </Link>
        </>
      ) : (
        <section className="card event-card" aria-labelledby="event-title">
          <h2 id="event-title" className="card-title">
            Something happened?
          </h2>
          <p className="card-body">
            A comment, a meeting, a look. Take twenty seconds to name it, then a short reset, then you choose what
            comes next.
          </p>
          <Link href="/check-in" className="btn btn-block">
            Start a check-in
          </Link>
        </section>
      )}
    </div>
  );
}
