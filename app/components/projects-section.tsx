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
  const mainUrl = project.liveUrl || project.githubUrl;

  return (
    <div className="group relative rounded-xl border border-border bg-bg-card p-5 hover:border-accent/50 transition-colors">
      {/* Main Link covering the card */}
      {mainUrl && (
        <a 
          href={mainUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute inset-0 z-10"
          aria-label={`View ${project.title}`}
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent">
          {project.title}
        </h3>
        {/* Icons must be above the main link */}
        <div className="relative z-20 flex gap-1">
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
