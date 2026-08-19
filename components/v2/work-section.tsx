import Link from "next/link";

import { ProjectCard } from "@/components/v2/project-card";
import { Section, SectionHeading } from "@/components/v2/section";
import { featuredProjects } from "@/lib/v2/config/projects";
import { routes } from "@/lib/v2/config/routes";

export function WorkSection() {
  return (
    <Section id="work">
      <SectionHeading
        title="Featured Projects"
        action={
          <Link
            href={routes.projects}
            className="text-muted-foreground hover:text-foreground shrink-0 text-sm underline-offset-4 transition-colors hover:underline"
          >
            All projects &rarr;
          </Link>
        }
      />

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
