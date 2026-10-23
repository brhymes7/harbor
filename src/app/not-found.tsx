import Link from "next/link";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function NotFound() {
  return (
    <>
      <ScreenHeader title="Nothing here" lede="That page doesn't exist. Today's check-in is still waiting for you." />
      <p style={{ marginTop: "var(--space-8)" }}>
        <Link href="/" className="btn">
          Back to Today
        </Link>
      </p>
    </>
  );
}
