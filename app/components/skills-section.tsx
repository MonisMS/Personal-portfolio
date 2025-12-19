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
  SiGraphql,
  SiDrizzle,
  SiBun,
  SiFramer
} from "react-icons/si";
import { RiStackLine } from "react-icons/ri"; // For TanStack
import { TbPolaroid } from "react-icons/tb"; // Placeholder for Polar.sh if not available, or use text

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
  { name: "Bun", icon: <SiBun /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Drizzle", icon: <SiDrizzle /> },
  { name: "TanStack", icon: <RiStackLine /> },
  { name: "Git", icon: <SiGit /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "Polar", icon: <TbPolaroid /> },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Stack</h2>
          <p className="mt-2 text-text-secondary">Tools I work with.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="text-base text-text-muted group-hover:text-text-primary transition-colors">
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
