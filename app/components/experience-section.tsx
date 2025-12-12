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
    <section id="about" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Experience</h2>
          <p className="mt-2 text-text-secondary">What I&apos;ve been up to.</p>
        </div>

        <div className="relative space-y-4 before:absolute before:left-[7px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-border">
          {experiences.map((exp, index) => (
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
