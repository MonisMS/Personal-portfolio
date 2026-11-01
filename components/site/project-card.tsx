import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/site/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({ project, priority, className }: ProjectCardProps) {
  return (
    <article className={cn("project-card", className)}>
      <Link href={`/projects/${project.slug}`} className="project-image" aria-label={`${project.title} case study`}>
        {project.image ? <Image src={project.image} alt={`${project.title} screenshot`} fill priority={priority} sizes="(min-width: 1024px) 464px, (min-width: 768px) 45vw, 90vw" className="object-cover object-top" /> : <span>{project.title}</span>}
      </Link>
      <div className="project-info">
        <div className="project-heading"><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><span>{project.year}</span></div>
        <p className="project-context">{project.context.replaceAll(" · ", ", ")}</p>
        <p className="project-description">{project.description}</p>
        <p className="project-metric">{project.metric.replaceAll(" · ", ", ")}</p>
        <p className="project-tech">{project.tech.join(" / ")}</p>
        <div className="project-actions">
          <Link href={`/projects/${project.slug}`}>Case study</Link>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>Live demo</a>}
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>Source code</a>
        </div>
      </div>
    </article>
  );
}
