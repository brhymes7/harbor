import { weekDays, type DayKey } from "@/lib/days";
import type { Streak } from "@/lib/streak";

const LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// A missed day is never drawn as a failure: it's either an open circle or a grace day.
export function StreakCard({ streak, days, today }: { streak: Streak; days: Set<DayKey>; today: DayKey }) {
  const grace = new Set(streak.graceDays);
  const fresh = streak.totalDays === 0;
  const away = streak.run === 0 && !fresh;

  return (
    <section className="card streak" aria-labelledby="streak-title">
      {/* No zero on screen: a new or returning person sees an invitation, not a score. */}
      {streak.run > 0 ? (
        <div className="streak-head">
          <p id="streak-title" className="streak-number">
            {streak.run}
            <span className="streak-unit">{streak.run === 1 ? " day" : " days"}</span>
          </p>
          <p className="streak-caption">in a row of showing up for yourself</p>
        </div>
      ) : (
        <h2 id="streak-title" className="card-title">
          {fresh ? "Day one starts with a check-in" : "Welcome back"}
        </h2>
      )}
      {away && <p className="streak-caption">Your past check-ins still count. Start a new rhythm today.</p>}

      <ol className="week" aria-label="This week">
        {weekDays(today).map((day, i) => {
          const state = days.has(day) ? "done" : grace.has(day) ? "grace" : day === today ? "today" : "open";
          const description = { done: "checked in", grace: "grace day", today: "today", open: "no check-in" }[state];
          return (
            <li key={day} className="week-day" data-state={state} aria-label={`${NAMES[i]}: ${description}`}>
              <span className="week-dot" aria-hidden="true" />
              <span className="week-letter" aria-hidden="true">
                {LETTERS[i]}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="streak-foot">
        {streak.graceAvailableThisWeek
          ? "One grace day a week is built in. Miss a day and your rhythm holds."
          : "You used this week's grace day. Your rhythm held."}
        {streak.totalDays > 0 && ` ${streak.totalDays} check-in ${streak.totalDays === 1 ? "day" : "days"} in all.`}
      </p>
    </section>
  );
}
