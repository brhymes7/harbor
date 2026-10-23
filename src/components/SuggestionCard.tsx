import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTEXTS, getTool } from "@/data/tools";
import type { Suggestion } from "@/lib/checkin";

export function SuggestionCard({ suggestion, eyebrow = "Suggested reset" }: { suggestion: Suggestion; eyebrow?: string }) {
  const tool = getTool(suggestion.toolId);
  if (!tool) return null;
  return (
    <section className="card suggestion" aria-labelledby="suggestion-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id="suggestion-title" className="card-title">
        {tool.title}
      </h2>
      <p className="card-meta">
        {CONTEXTS[tool.context].label} · {tool.minutes} min
      </p>
      <p className="card-body">{suggestion.reason}</p>
      <Link href={`/tools/${tool.id}`} className="btn btn-block">
        Start the {tool.minutes}-minute reset
        <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </section>
  );
}
