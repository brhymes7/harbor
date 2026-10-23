import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPlayer } from "@/components/ToolPlayer";
import { TOOLS, getTool } from "@/data/tools";

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const tool = getTool((await params).id);
  return tool ? { title: `${tool.title}: a ${tool.minutes}-minute reset | Harbor` } : {};
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const tool = getTool((await params).id);
  if (!tool) notFound();
  return <ToolPlayer tool={tool} />;
}
