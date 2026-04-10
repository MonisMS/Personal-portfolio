"use client";

import Image from "next/image";
import { ArrowRight, Github, Globe } from "lucide-react";
import {
  SiDocker,
  SiDrizzle,
  SiElectron,
  SiFastify,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiNodedotjs,
} from "react-icons/si";
import type { Project } from "@/lib/types";

interface TechIconProps {
  name: string;
}

function TechIcon({ name }: TechIconProps) {
  const iconClass = "w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors";

  switch (name) {
    case "Next.js":
      return <SiNextdotjs className={iconClass} />;
    case "TypeScript":
      return <SiTypescript className={iconClass} />;
    case "OpenAI":
      return <SiOpenai className={iconClass} />;
    case "React":
      return <SiReact className={iconClass} />;
    case "Tailwind":
      return <SiTailwindcss className={iconClass} />;
    case "Vite":
      return <SiVite className={iconClass} />;
    case "Redis":
      return <SiRedis className={iconClass} />;
    case "Docker":
      return <SiDocker className={iconClass} />;
    case "PostgreSQL":
      return <SiPostgresql className={iconClass} />;
    case "Drizzle":
      return <SiDrizzle className={iconClass} />;
    case "Fastify":
      return <SiFastify className={iconClass} />;
    case "Electron":
      return <SiElectron className={iconClass} />;
    case "PM2":
      return <SiNodedotjs className={iconClass} />;
    default:
      return null;
  }
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const mainUrl = project.liveUrl || project.githubUrl;

  return (
    <a
      href={mainUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-bg-secondary group-hover:scale-[1.02] transition-transform duration-500">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-bg-card via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-col flex-1 p-6 -mt-6 relative z-10">
        <div className="flex items-start justify-between mb-3 mt-3">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-3">
            {project.liveUrl && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                }}
                className="text-text-muted hover:text-accent transition-colors"
                aria-label="Live Demo"
              >
                <Globe size={18} />
              </span>
            )}
            {project.githubUrl && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                }}
                className="text-text-muted hover:text-accent transition-colors"
                aria-label="GitHub Repo"
              >
                <Github size={18} />
              </span>
            )}
          </div>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-3">
            {project.tech.map((techName) => (
              <div key={techName} title={techName}>
                <TechIcon name={techName} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className={`flex items-center gap-2 text-xs font-medium ${project.isBuilding ? "text-amber-500" : "text-emerald-500"}`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.isBuilding ? "bg-amber-400" : "bg-emerald-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${project.isBuilding ? "bg-amber-500" : "bg-emerald-500"}`}></span>
              </span>
              {project.isBuilding ? "In Development" : "All Systems Operational"}
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-text-muted group-hover:text-accent transition-colors">
              View Details
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
