"use client";

import Image from "next/image";
import { Github, ArrowRight, Globe } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiOpenai,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiRedis,
  SiDocker,
  SiPostgresql
} from "react-icons/si";
import { PROJECTS_DATA } from "@/lib/data";
import { Project } from "@/lib/types";

const TechIcon = ({ name }: { name: string }) => {
  const iconClass = "w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors";

  switch (name) {
    case "Next.js": return <SiNextdotjs className={iconClass} />;
    case "TypeScript": return <SiTypescript className={iconClass} />;
    case "OpenAI": return <SiOpenai className={iconClass} />;
    case "React": return <SiReact className={iconClass} />;
    case "Tailwind": return <SiTailwindcss className={iconClass} />;
    case "Vite": return <SiVite className={iconClass} />;
    case "Redis": return <SiRedis className={iconClass} />;
    case "Docker": return <SiDocker className={iconClass} />;
    case "PostgreSQL": return <SiPostgresql className={iconClass} />;
    default: return null;
  }
};

function ProjectCard({ project }: { project: Project }) {
  const mainUrl = project.liveUrl || project.githubUrl;

  return (
    <a
      href={mainUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 cursor-pointer"
    >
      {/* Image Area */}
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

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-bg-card via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6 -mt-6 relative z-10">
        {/* Header */}
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

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack & Footer */}
        <div className="mt-auto space-y-4">
          {/* Tech Icons */}
          <div className="flex items-center gap-3">
            {project.tech.map((t) => (
              <div key={t} title={t}>
                <TechIcon name={t} />
              </div>
            ))}
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className={`flex items-center gap-2 text-xs font-medium ${project.isBuilding ? 'text-amber-500' : 'text-emerald-500'}`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.isBuilding ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${project.isBuilding ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
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

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-bg-primary px-4 pt-16 pb-20">
      {/* Soft Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-3">

          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Projects
          </h2>
          <p className="text-text-secondary max-w-lg">
            Some things I&apos;ve built.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}

          {/* Coming Soon Card */}
          <a
            href="https://github.com/MonisMS"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-center items-center text-center rounded-xl border border-dashed border-border bg-bg-card/50 p-8 hover:border-accent/50 hover:bg-bg-card transition-all"
          >
            <div className="mb-4 rounded-full bg-bg-hover p-4 text-text-muted group-hover:text-accent transition-colors">
              <Github size={28} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent">
              More projects coming soon
            </h3>
            <p className="mt-2 text-sm text-text-secondary max-w-[250px]">
              Visit my GitHub to see what I&apos;m currently working on.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
