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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-xl border border-border bg-bg-card p-5 hover:border-accent/50">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent">
          {project.title}
        </h3>
        <div className="flex gap-1">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-muted hover:text-accent" aria-label="GitHub">
              <Github size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-muted hover:text-accent" aria-label="Live">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full bg-bg-hover px-3 py-1 text-xs text-text-muted">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Projects</h2>
          <p className="mt-2 text-text-secondary">Some things I&apos;ve built.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
