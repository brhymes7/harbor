import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CONTEXTS, TOOLS, type ToolContext } from "@/data/tools";

const ORDER: ToolContext[] = ["microaggression", "fatigue", "news"];

export const metadata: Metadata = { title: "Resets for what just happened" };

export default function ToolsPage() {
  return (
    <>
      <ScreenHeader
        eyebrow="Three minutes or less"
        title="Resets for what just happened"
        lede="Short exercises for after a microaggression, a long stretch of racial battle fatigue, or a hard news day."
      />
      {ORDER.map((context) => (
        <section key={context} className="tool-group" aria-labelledby={`group-${context}`}>
          <h2 id={`group-${context}`} className="group-title">
            {CONTEXTS[context].label}
          </h2>
          <p className="group-blurb">{CONTEXTS[context].blurb}</p>
          <ul className="tool-list">
            {TOOLS.filter((tool) => tool.context === context).map((tool) => (
              <li key={tool.id}>
                <Link href={`/tools/${tool.id}`} className="tool-row">
                  <span className="tool-row-text">
                    <span className="tool-row-title">{tool.title}</span>
                    <span className="tool-row-summary">{tool.summary}</span>
                  </span>
                  <span className="tool-row-minutes">{tool.minutes} min</span>
                  <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" className="tool-row-chevron" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
