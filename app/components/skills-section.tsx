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

        <div className="flex flex-wrap gap-3">
          {SKILLS_DATA.map((skill) => (
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
