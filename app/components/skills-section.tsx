"use client";

import { SKILLS_DATA } from "@/lib/data";

export function SkillsSection() {
  return (
    <section id="skills" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Stack</h2>
          <p className="text-text-secondary">Tools I work with.</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {SKILLS_DATA.map((skill) => (
            <div
              key={skill.name}
              className="group inline-flex items-center gap-2 rounded-lg border border-border/70 bg-bg-card px-3.5 py-2 transition-colors duration-200 hover:border-accent/40 hover:bg-bg-hover"
            >
              <span className="text-[15px] leading-none text-text-muted transition-colors group-hover:text-text-primary">
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
