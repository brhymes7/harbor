import { ScreenHeader } from "@/components/ScreenHeader";

export default function CheckInPage() {
  return (
    <>
      <ScreenHeader eyebrow="About 20 seconds" title="How are you carrying today?" lede="Name the feeling, notice your body, and we'll suggest a reset that fits." />
      <p className="placeholder">{"Mood, tension, and what's weighing on you are coming in phase 2."}</p>
    </>
  );
}
