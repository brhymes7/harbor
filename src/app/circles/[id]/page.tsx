import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CircleFeed } from "@/components/CircleFeed";
import { CIRCLES, getCircle } from "@/data/circles";

export function generateStaticParams() {
  return CIRCLES.map((circle) => ({ id: circle.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const circle = getCircle((await params).id);
  return circle ? { title: `${circle.name} circle` } : {};
}

export default async function CirclePage({ params }: { params: Promise<{ id: string }> }) {
  const circle = getCircle((await params).id);
  if (!circle) notFound();
  return (
    <>
      <Link href="/circles" className="back-link">
        <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
        All circles
      </Link>
      <header>
        <p className="eyebrow">
          {circle.members} members · demo circle
        </p>
        <h1 className="screen-title">{circle.name}</h1>
        <p className="screen-lede">{circle.about}</p>
      </header>
      <section className="norms" aria-label="Circle agreements">
        <p className="norms-by">Held by {circle.facilitator}</p>
        <ul>
          {circle.norms.map((norm) => (
            <li key={norm}>{norm}</li>
          ))}
        </ul>
      </section>
      <CircleFeed circle={circle} />
    </>
  );
}
