import { notFound } from "next/navigation";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CONTEXTS, TOOLS, getTool } from "@/data/tools";

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ id: tool.id }));
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getTool(id);
  if (!tool) notFound();
  return (
    <>
      <ScreenHeader eyebrow={`${CONTEXTS[tool.context].label} · ${tool.minutes} min`} title={tool.title} lede={tool.summary} />
      <p className="placeholder">{"The guided steps for this reset are coming in phase 3."}</p>
    </>
  );
}
