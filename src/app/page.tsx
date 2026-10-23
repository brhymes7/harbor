import Link from "next/link";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function TodayPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="Today"
        title="A reset for what just happened"
        lede="Check in, take three minutes for your nervous system, and come back tomorrow."
      />
      <p className="placeholder">{"Your streak and today's suggestion are coming in phase 2."}</p>
      <p style={{ marginTop: "var(--space-8)" }}>
        <Link href="/check-in" className="btn">
          Start today&apos;s check-in
        </Link>
      </p>
    </>
  );
}
