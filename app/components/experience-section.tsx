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
    <section id="about" className="bg-black px-4 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Experience
          </h2>
          <p className="mt-3 text-neutral-400">
            Where I&apos;ve been and what I&apos;ve done.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-neutral-800">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8">
              {/* Dot */}
              <div
                className={`absolute left-0 top-2 h-4 w-4 rounded-full border-2 ${
                  exp.current
                    ? "border-emerald-500 bg-emerald-500/20"
                    : "border-neutral-600 bg-neutral-900"
                }`}
              />

              {/* Content */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition-colors hover:border-neutral-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-white">{exp.role}</h3>
                  <span className="text-xs text-neutral-500">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-400">{exp.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
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
