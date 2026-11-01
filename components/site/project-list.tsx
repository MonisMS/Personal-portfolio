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
      <noscript><style>{`[data-more-projects].hidden { display: block !important; } .project-disclosure { display: none !important; }`}</style></noscript>
      <div className="project-list">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} />
        ))}
      </div>
      {more.length > 0 && (
        <>
          <div id={moreId} data-more-projects className={cn("more-projects", !expanded && "hidden")}>
            <h3 className="more-projects-title">More projects</h3>
            <div className="project-list">
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
            className="site-button project-disclosure"
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown aria-hidden className={cn("size-4 transition-transform motion-reduce:transition-none", expanded && "rotate-180")} />
          </button>
        </>
      )}
    </div>
  );
}
