"use client";

import { EXPERIENCE_DATA } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section id="about" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Background</h2>
          <p className="text-text-secondary">Where I&apos;m at right now.</p>
        </div>

        <div className="relative space-y-4 before:absolute before:left-[7px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-border">
          {EXPERIENCE_DATA.map((exp, index) => (
            <div key={index} className="relative pl-8">
              <div className={`absolute left-0 top-3 h-3.5 w-3.5 rounded-full border-2 ${exp.current ? "border-accent bg-accent/20" : "border-border bg-bg-primary"}`} />
              
              <div className="rounded-xl border border-border bg-bg-card p-5 hover:border-accent/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-text-primary">{exp.role}</h3>
                  <span className="text-xs text-accent">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{exp.company}</p>
                <p className="mt-2 text-sm text-text-secondary">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
