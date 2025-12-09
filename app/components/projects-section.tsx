"use client";

import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "AskAI",
    description:
      "An AI-powered platform with real-time OpenAI integration, meeting processing, and summarization features. Built with Next.js, Drizzle ORM, and Inngest for background jobs.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Drizzle", "Inngest"],
    liveUrl: "https://askai-nu.vercel.app/",
    githubUrl: "https://github.com/MonisMS/askai",
  },
  {
    title: "Folder Organizer",
    description:
      "A monorepo file organization tool with undo functionality, job queues, and Redis integration. Automates folder structure management with a clean dashboard UI.",
    tech: ["TypeScript", "Redis", "Docker", "Monorepo"],
    githubUrl: "https://github.com/MonisMS/folder-organizer",
  },
  {
    title: "Tunes Generator",
    description:
      "A music player application with audio playback controls including pause, resume, and volume adjustment. Features a vinyl-inspired UI design.",
    tech: ["React", "TypeScript", "Vite", "Tailwind"],
    liveUrl: "https://tunes-generator.vercel.app/",
    githubUrl: "https://github.com/MonisMS/Tunes-generator-",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div 
      className="group relative rounded-xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        
        {/* Links */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted transition-colors duration-200 hover:text-accent"
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
              className="p-2 text-text-muted transition-colors duration-200 hover:text-accent"
              aria-label="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-bg-hover px-3 py-1 text-xs text-text-secondary"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Crimson accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-accent/0 transition-all duration-300 group-hover:bg-accent/50" />
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-bg-primary px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-accent mb-3">Portfolio</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-text-primary">
            Projects & Proof of Work
          </h2>
          <p className="mt-3 text-text-secondary">
            Things I&apos;ve built, shipped, and am proud of.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
