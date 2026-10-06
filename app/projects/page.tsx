import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { BuildList } from "@/components/site/build-list";
import { PageHeader } from "@/components/site/page-header";
import { ProjectCard } from "@/components/site/project-card";
import { Section } from "@/components/site/section";
import { builds, projects } from "@/lib/site/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Syed Monis Sarwar: APIx, Curio, FieldProof, DataPilot and Shikshak Saathi — data pipelines, AI agents and backends.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[44rem] px-4 sm:px-6">
      <PageHeader />
      <main className="space-y-14">
        <header className="pt-12">
          <h1 className="rise font-display text-fg text-[2.4rem] leading-none tracking-[-0.01em]">
            Projects
          </h1>
          <p
            className="rise text-muted mt-4 max-w-prose text-[15px] leading-relaxed"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Everything I&apos;d point a hiring manager at. Open one for how it
            works and what was hard about it.
          </p>
        </header>

        <div className="space-y-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>

        <Section id="builds" title="Smaller builds">
          <BuildList builds={builds} initial={builds.length} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
