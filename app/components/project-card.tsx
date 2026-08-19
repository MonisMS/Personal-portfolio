"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const previewUrl = project.liveUrl || project.githubUrl;

  return (
    <div className="group flex flex-col">
      {/* Raw, rounded screenshot — no border, no wash */}
      <a
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-[2/1] w-full overflow-hidden rounded-xl bg-bg-secondary"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
        )}
      </a>

      <div className="flex flex-col pt-5">
        <h3 className="text-xl font-bold tracking-tight text-text-primary">
          {project.title}
        </h3>

        {/* Tech, slash-separated */}
        <p className="mt-1.5 text-sm font-medium text-text-secondary">
          {project.tech.join(" / ")}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-6 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-accent"
            >
              <ExternalLink size={15} />
              Live Preview
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-accent"
            >
              <Github size={15} />
              Repo Url
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
