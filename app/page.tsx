import { Footer } from "@/components/site/footer";
import { GithubActivity } from "@/components/site/github-activity";
import { Intro } from "@/components/site/intro";
import { BuildList } from "@/components/site/build-list";
import { Contact } from "@/components/site/contact";
import { PullRequestList } from "@/components/site/link-list";
import { ProjectCard } from "@/components/site/project-card";
import { ScrollPill } from "@/components/site/scroll-pill";
import { Section } from "@/components/site/section";
import { pullRequests } from "@/lib/site/open-source";
import { builds, projects } from "@/lib/site/projects";

export default function HomePage() {
  return (
    <>
      <main id="main" className="mx-auto w-full max-w-[44rem] space-y-14 px-4 sm:px-6">
        <Intro />
        <GithubActivity />

        <Section
          id="projects"
          title="Projects"
          description="Recent work, with the numbers behind it."
          action={{ label: "All projects", href: "/projects" }}
        >
          <div className="space-y-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i === 0} />
            ))}
          </div>
        </Section>

        <Section
          id="open-source"
          title="Open source"
          description="Merged pull requests to projects I don't own."
        >
          <PullRequestList pullRequests={pullRequests} />
        </Section>

        <Section
          id="builds"
          title="Smaller builds"
          description="Focused tools and systems worth a look."
        >
          <BuildList builds={builds} />
        </Section>

        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>

      <div className="mx-auto w-full max-w-[44rem] px-4 sm:px-6">
        <Footer />
      </div>
      <ScrollPill />
    </>
  );
}
