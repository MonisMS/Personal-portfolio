"use client";

import { PROJECTS_DATA } from "@/lib/data";
import { ProjectCard } from "@/app/components/project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-bg-primary px-4 pt-16 pb-20">
      {/* Soft Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-border/40 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-3">

          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Projects
          </h2>
          <p className="text-text-secondary max-w-lg">
            Some things I&apos;ve built.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
