import Link from "next/link";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TodaySummary } from "@/components/TodaySummary";

export default function TodayPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="Today"
        title="For what happens at work"
        lede="Microaggressions, being the only one, the weight you carry home. Acknowledge it, reset your body, and choose your next step."
      />
      <TodaySummary />
      <Link href="/trust" className="text-link trust-link">
        Your check-ins stay on this phone
      </Link>
    </>
  );
}
