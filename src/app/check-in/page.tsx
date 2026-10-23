import type { Metadata } from "next";
import { CheckInFlow } from "@/components/CheckInFlow";
import { ScreenHeader } from "@/components/ScreenHeader";

export const metadata: Metadata = { title: "Check in" };

export default function CheckInPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="About 20 seconds"
        title="How are you carrying today?"
        lede="Name the feeling, notice your body, and we'll suggest a reset that fits."
      />
      <CheckInFlow />
    </>
  );
}
