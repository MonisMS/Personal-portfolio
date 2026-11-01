import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { BuildList } from "@/components/site/build-list";
import { PageHeader } from "@/components/site/page-header";
import { ProjectList } from "@/components/site/project-list";
import { Section } from "@/components/site/section";
import { builds, projects } from "@/lib/site/projects";
import { pageMetadata } from "@/lib/site/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Syed Monis Sarwar: Curio, DataPilot and Shikshak Saathi, plus more projects. Data pipelines, AI agents and backends.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="site-container">
      <PageHeader />
      <main id="main" className="projects-main">
        <header className="page-intro">
          <h1 className="page-title">
            Projects
          </h1>
          <p
            className="page-lead"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Everything I&apos;d point a hiring manager at. Open one for how it
            works and what was hard about it.
          </p>
        </header>

        <ProjectList projects={projects} />

        <Section id="builds" title="Smaller builds">
          <BuildList builds={builds} initial={builds.length} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
