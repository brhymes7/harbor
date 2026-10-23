import type { Metadata } from "next";
import { DataControls } from "@/components/DataControls";
import { ScreenHeader } from "@/components/ScreenHeader";

const FACTS = [
  {
    title: "No account",
    body: "There's no sign-up, no email, and no name. Harbor doesn't know who you are.",
  },
  {
    title: "No server copy",
    body: "Check-ins, your streak, and circle posts are saved only in this browser on this phone. They never leave it.",
  },
  {
    title: "No tracking",
    body: "No analytics, no ads, and no third-party scripts. Fonts and icons ship with the app.",
  },
  {
    title: "You can take it or erase it",
    body: "Download your check-ins any time, or erase everything Harbor saved on this phone.",
  },
];

export const metadata: Metadata = { title: "Your data stays on your phone" };

export default function TrustPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="Your data"
        title="It stays on your phone"
        lede="Trust has to be earned, especially in health care. So Harbor is built to need as little of it as possible."
      />
      <dl className="facts">
        {FACTS.map((fact) => (
          <div key={fact.title} className="fact">
            <dt>{fact.title}</dt>
            <dd>{fact.body}</dd>
          </div>
        ))}
      </dl>
      <DataControls />
      <p className="fine-print">
        Harbor is a wellness tool, not medical care or therapy. It can&apos;t diagnose or treat anything. If you&apos;re in
        crisis, call or text 988. In an emergency, call 911.
      </p>
    </>
  );
}
