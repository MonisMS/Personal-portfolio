"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProjectCard } from "@/components/site/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/site/projects";

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className }: ProjectListProps) {
  const [expanded, setExpanded] = useState(false);
  const moreId = useId();
  const featured = projects.filter((project) => !project.more);
  const more = projects.filter((project) => project.more);

  return (
    <div className={className}>
      <div className="space-y-3">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} />
        ))}
      </div>
      {more.length > 0 && (
        <>
          <div id={moreId} hidden={!expanded} className="mt-8">
            <h3 className="font-display text-fg mb-5 text-2xl">More projects</h3>
            <div className="space-y-3">
              {more.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={moreId}
            className="border-line-strong text-muted hover:text-fg hover:bg-surface-2 mt-5 inline-flex min-h-10 items-center gap-2 rounded-md border px-4 text-sm transition-colors"
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown aria-hidden className={cn("size-4 transition-transform motion-reduce:transition-none", expanded && "rotate-180")} />
          </button>
        </>
      )}
    </div>
  );
}
