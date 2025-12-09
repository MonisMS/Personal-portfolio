"use client";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2024 - Present",
    description:
      "Building web applications for clients using React, Next.js, and Node.js. Delivering end-to-end solutions from design to deployment.",
    current: true,
  },
  {
    role: "Open Source Contributor",
    company: "GitHub",
    period: "2023 - Present",
    description:
      "Contributing to open source projects, learning from the community, and building in public.",
  },
  {
    role: "CS Student",
    company: "University",
    period: "2022 - Present",
    description:
      "Pursuing Computer Science, diving deep into algorithms, system design, and software engineering fundamentals.",
  },
];

export function ExperienceSection() {
  return (
    <section id="about" className="bg-bg-primary px-4 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-accent mb-3">Journey</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-text-primary">
            Experience
          </h2>
          <p className="mt-3 text-text-secondary">
            Where I&apos;ve been and what I&apos;ve done.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-6 before:absolute before:left-[7px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-accent/30">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="relative pl-8 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Dot */}
              <div
                className={`absolute left-0 top-3 h-4 w-4 rounded-full border-2 transition-colors duration-300 ${
                  exp.current
                    ? "border-accent bg-accent/20"
                    : "border-border bg-bg-primary"
                }`}
              />

              {/* Content */}
              <div className="group rounded-xl border border-border bg-bg-card p-5 transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-accent font-medium">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{exp.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
