import { weekDays, type DayKey } from "@/lib/days";
import type { Streak } from "@/lib/streak";

const LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Secondary to the main flow: a quiet record of showing up. A missed day is never drawn as a failure.
export function StreakCard({ streak, days, today }: { streak: Streak; days: Set<DayKey>; today: DayKey }) {
  const grace = new Set(streak.graceDays);
  const line =
    streak.run > 0
      ? `You've checked in ${streak.run} ${streak.run === 1 ? "day" : "days"} running.`
      : streak.totalDays > 0
        ? "Welcome back. Your past check-ins still count."
        : "Your check-ins will show up here.";

  return (
    <section className="streak-compact" aria-labelledby="streak-title">
      <div className="streak-row">
        <p id="streak-title" className="streak-line">
          {line}
        </p>
        <ol className="week week-compact" aria-label="This week">
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
      </div>
      <p className="streak-foot">
        {streak.graceAvailableThisWeek
          ? "One grace day a week is built in. Miss a day and nothing breaks."
          : "You used this week's grace day. Nothing broke."}
      </p>
    </section>
  );
}
