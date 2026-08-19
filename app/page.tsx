import { HeroSection } from "./components/herosection";
import { Navbar } from "./components/navbar";
import { ProjectsSection } from "./components/projects-section";
import { OpenSourceSection } from "./components/open-source-section";
import { SkillsSection } from "./components/skills-section";
import { GithubActivity } from "./components/github-activity";
import { ExperienceSection } from "./components/experience-section";
import { BlogsSection } from "./components/blogs-section";
import { ContactSection } from "./components/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <OpenSourceSection />
      <GithubActivity />
      <SkillsSection />
      <ExperienceSection />
      <BlogsSection />
      <ContactSection />
    </>
  );
}