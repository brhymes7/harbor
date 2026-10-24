import type { Metadata } from "next";
import Link from "next/link";
import { ResourceList } from "@/components/ResourceList";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CRISIS, DIRECTORIES, VERIFIED_ON } from "@/data/resources";

const verified = new Date(`${VERIFIED_ON}T12:00:00`).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const metadata: Metadata = { title: "Crisis lines and Black therapists" };

export default function SupportPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="Need more than this?"
        title="You don't have to carry it alone"
        lede="A reset can take the edge off. Some days need a person. Explore support lines and therapist directories below."
      />

      <section className="support-section" aria-labelledby="crisis-title">
        <h2 id="crisis-title" className="group-title">
          Right now
        </h2>
        <ResourceList resources={CRISIS} tone="support" />
      </section>

      <section className="support-section" aria-labelledby="directories-title">
        <h2 id="directories-title" className="group-title">
          Find a Black therapist
        </h2>
        <p className="group-blurb">
          Directories run by and for Black communities, plus one with sliding-scale filters.
        </p>
        <ResourceList resources={DIRECTORIES} tone="neutral" />
      </section>

      <p className="fine-print">
        Harbor is a wellness tool, not medical care. Links checked {verified}. Harbor isn&apos;t affiliated with any of
        these organizations. <Link href="/trust">How Harbor handles your data</Link>
      </p>
    </>
  );
}
