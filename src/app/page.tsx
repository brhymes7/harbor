import { ScreenHeader } from "@/components/ScreenHeader";
import { TodaySummary } from "@/components/TodaySummary";

export default function TodayPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="Today"
        title="A reset for what just happened"
        lede="Check in, take three minutes for your nervous system, and come back tomorrow."
      />
      <TodaySummary />
    </>
  );
}
