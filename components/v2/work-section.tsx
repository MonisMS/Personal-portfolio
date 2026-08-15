import { ProjectCard } from "@/components/v2/project-card";
import { Section, SectionHeading } from "@/components/v2/section";
import { featuredProjects } from "@/lib/v2/config/projects";

export function WorkSection() {
  return (
    <Section id="work">
      <SectionHeading title="Featured Projects" />

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
