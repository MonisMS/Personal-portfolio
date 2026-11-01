import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { GithubActivity } from "@/components/site/github-activity";
import { Intro, IntroDetails } from "@/components/site/intro";
import { BuildList } from "@/components/site/build-list";
import { Contact } from "@/components/site/contact";
import { PullRequestList } from "@/components/site/link-list";
import { ProjectList } from "@/components/site/project-list";
import { SiteNav } from "@/components/site/site-nav";
import { Section } from "@/components/site/section";
import { pullRequests } from "@/lib/site/open-source";
import { site } from "@/lib/site/config";
import { builds, projects } from "@/lib/site/projects";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} · RSS` }],
    },
  },
};

export default function HomePage() {
  return (
    <>
      <main id="main" className="site-container home-main">
        <SiteNav />
        <Intro />

        <Section
          id="projects"
          title="Selected projects"
          description="Recent work, with the numbers behind it."
          action={{ label: "All projects", href: "/projects" }}
        >
          <ProjectList projects={projects} />
        </Section>

        <Section id="about" title="About">
          <IntroDetails />
        </Section>

        <GithubActivity />

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

      <div className="site-container">
        <Footer />
      </div>
    </>
  );
}
