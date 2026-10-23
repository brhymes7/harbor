import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CIRCLES } from "@/data/circles";

export default function CirclesPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="Peer support"
        title="People who get it"
        lede="Small circles where you can say how you're doing without explaining why it's hard."
      />
      <p className="demo-banner">
        <strong>Demo.</strong> Real circles are small, invite-only, and led by trained peer facilitators. Posts and
        people here are fictional.
      </p>
      <ul className="circle-list">
        {CIRCLES.map((circle) => (
          <li key={circle.id}>
            <Link href={`/circles/${circle.id}`} className="circle-card">
              <span className="circle-card-text">
                <span className="card-title">{circle.name}</span>
                <span className="circle-about">{circle.about}</span>
                <span className="card-meta">
                  {circle.members} members · {circle.facilitator}
                </span>
              </span>
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" className="tool-row-chevron" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
