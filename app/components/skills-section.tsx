"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiPrisma,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Git", icon: <SiGit /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Vercel", icon: <SiVercel /> },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-bg-primary px-4 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-accent mb-3">Technologies</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-text-primary">
            Skills & Stack
          </h2>
          <p className="mt-3 text-text-secondary">
            Tech I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-3 stagger-children">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-2.5 rounded-full border border-border bg-bg-card px-4 py-2.5 transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover"
            >
              <span className="text-lg text-text-secondary group-hover:text-accent transition-colors duration-300">
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
