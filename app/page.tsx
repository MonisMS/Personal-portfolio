import { HeroSection } from "./components/herosection";
import { Navbar } from "./components/navbar";
import { ProjectsSection } from "./components/projects-section";
import { SkillsSection } from "./components/skills-section";
import { ExperienceSection } from "./components/experience-section";
import { BlogsSection } from "./components/blogs-section";
import { ContactSection } from "./components/contact-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <BlogsSection />
      <ContactSection />
    </>
  );
}