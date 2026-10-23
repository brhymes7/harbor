import Link from "next/link";
import { LifeBuoy, Phone } from "lucide-react";

// Shown before any exercise when a check-in reads as can't-settle. Phase 4 turns this into the full support sheet.
export function SupportCallout() {
  return (
    <section className="support-callout" role="region" aria-labelledby="support-callout-title">
      <h2 id="support-callout-title" className="support-title">
        <LifeBuoy size={20} strokeWidth={1.75} aria-hidden="true" />
        This sounds like a lot to hold alone
      </h2>
      <p>
        A breathing exercise can help, but it isn&apos;t enough on its own right now. Talking to someone can. 988 is free,
        confidential, and open 24/7, by call or text.
      </p>
      <div className="support-actions">
        <a href="tel:988" className="btn btn-support">
          <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
          Call 988
        </a>
        <a href="sms:988" className="btn btn-support-ghost">
          Text 988
        </a>
      </div>
      <Link href="/support" className="support-more">
        See Black-centered therapists and other options
      </Link>
    </section>
  );
}
