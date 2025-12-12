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
    <section id="skills" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Stack</h2>
          <p className="mt-2 text-text-secondary">Tools I work with.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 hover:border-accent/50"
            >
              <span className="text-base text-text-muted">{skill.icon}</span>
              <span className="text-sm text-text-secondary">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
