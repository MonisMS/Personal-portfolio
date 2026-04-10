"use client";

import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
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

        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent/50 hover:text-accent"
          >
            See more projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
