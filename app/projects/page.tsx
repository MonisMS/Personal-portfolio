import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/app/components/project-card";
import { ALL_PROJECTS_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects | Monis Sarwar",
  description: "Featured and additional projects built by Monis Sarwar.",
};

export default function ProjectsPage() {
  return (
    <section className="min-h-screen bg-bg-primary px-4 pt-20 pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              All Projects
            </h1>
            <p className="mt-2 text-text-secondary">
              Featured work plus additional projects from my resume.
            </p>
          </div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ALL_PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
