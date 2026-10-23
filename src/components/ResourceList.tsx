import { ArrowUpRight } from "lucide-react";
import type { Resource } from "@/data/resources";

export function ResourceList({ resources, tone }: { resources: Resource[]; tone: "support" | "neutral" }) {
  return (
    <ul className={`resources resources-${tone}`}>
      {resources.map((resource) => (
        <li key={resource.name} className="resource">
          <h3 className="resource-name">{resource.name}</h3>
          <p className="resource-detail">{resource.detail}</p>
          <div className="resource-actions">
            {resource.actions.map((action) => {
              const external = action.href.startsWith("http");
              return (
                <a
                  key={action.href}
                  href={action.href}
                  className={action.primary ? "btn btn-support" : "btn btn-quiet"}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {action.label}
                  {external && <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />}
                </a>
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );
}
