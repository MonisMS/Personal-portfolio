"use client";

import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  status: "Running" | "Completed" | "In Progress" | "Archived";
  tech: string[];
  icon: string; // emoji or could be replaced with image
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "JWT-Auth",
    description:
      "A ready-to-use JWT authentication API built with Express, TypeScript, and MongoDB. Secure password hashing and robust authentication measures.",
    status: "Running",
    tech: ["Express", "TypeScript", "MongoDB", "JWT"],
    icon: "🔐",
    githubUrl: "https://github.com/MonisMS",
  },
  {
    title: "Portfolio",
    description:
      "Personal portfolio website built with Next.js 14, Tailwind CSS, and TypeScript. Showcasing projects and skills with a clean, modern design.",
    status: "In Progress",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    icon: "🚀",
    githubUrl: "https://github.com/MonisMS",
  },
  {
    title: "Project Three",
    description:
      "Placeholder for your next awesome project. Replace this with a real project description showcasing your skills and impact.",
    status: "Completed",
    tech: ["React", "Node.js", "PostgreSQL"],
    icon: "⚡",
    githubUrl: "https://github.com/MonisMS",
  },
];

const statusColors: Record<Project["status"], string> = {
  Running: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Progress": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Archived: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex gap-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900">
      {/* Icon */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-2xl">
        {project.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-neutral-400 line-clamp-2">
          {project.description}
        </p>

        {/* Tech + Links */}
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white"
                aria-label="Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-black px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Projects & Proof of Work
          </h2>
          <p className="mt-3 text-neutral-400">
            Things I&apos;ve built, shipped, and am proud of.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
