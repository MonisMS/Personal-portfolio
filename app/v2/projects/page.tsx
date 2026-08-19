import type { Metadata } from "next";

import { Container } from "@/components/v2/container";
import { ProjectCard } from "@/components/v2/project-card";
import { Section, SectionHeading } from "@/components/v2/section";
import { projects } from "@/lib/v2/config/projects";
import { routes } from "@/lib/v2/config/routes";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Everything I've built — full-stack products where the hard part is the backend.",
  alternates: { canonical: routes.projects },
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section>
        <SectionHeading title="Projects" />

        <p className="text-muted-foreground mb-10 max-w-prose text-[15px] leading-relaxed">
          Every project, most-recent first — the featured few and the rest.
        </p>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
