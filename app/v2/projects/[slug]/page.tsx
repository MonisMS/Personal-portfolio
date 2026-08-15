import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/v2/container";
import { ProjectImage } from "@/components/v2/project-image";
import { Todo, showPlaceholders } from "@/components/v2/todo";
import { getProject, projects } from "@/lib/v2/config/projects";
import { routes } from "@/lib/v2/config/routes";
import { site } from "@/lib/v2/config/site";
import type { Project } from "@/lib/v2/types";

// Pre-render one page per project at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  };
}

// The four case-study facts, in reading order. Recruiters scan these first.
const META_FIELDS: { key: keyof Project["meta"]; label: string }[] = [
  { key: "year", label: "Year" },
  { key: "role", label: "Role" },
  { key: "team", label: "Team" },
  { key: "timeline", label: "Timeline" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { title, summary, description, tech, image, liveUrl, githubUrl, meta } =
    project;

  // In production, only surface facts that are actually filled in. In dev,
  // every field shows as a TODO chip so the missing content is visible.
  const metaRows = META_FIELDS.filter(
    ({ key }) => showPlaceholders || meta[key],
  );

  return (
    <Container>
      <article className="v2-rise py-14 md:py-20">
        <Link
          href={routes.anchor("work")}
          className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Projects
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-foreground font-display text-[2.5rem] leading-[1.05] tracking-tight sm:text-[3rem]">
            {title}
          </h1>
          {project.status === "building" ? (
            <span className="border-border text-muted-foreground shrink-0 rounded-full border px-2.5 py-0.5 text-xs">
              In development
            </span>
          ) : null}
        </div>

        <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
          {summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {liveUrl ? (
            <Action href={liveUrl}>Visit live site</Action>
          ) : null}
          {githubUrl ? <Action href={githubUrl}>Source</Action> : null}
        </div>

        {metaRows.length > 0 ? (
          <dl className="border-border/60 mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-8 sm:grid-cols-4">
            {metaRows.map(({ key, label }) => (
              <div key={key}>
                <dt className="text-muted-foreground/70 font-mono text-xs tracking-wide uppercase">
                  {label}
                </dt>
                <dd className="text-foreground mt-1.5 text-sm">
                  {meta[key] || <Todo>{label.toLowerCase()}</Todo>}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {image ? (
          <div className="mt-10">
            <ProjectImage src={image} alt={`${title} screenshot`} priority />
          </div>
        ) : null}

        <div className="mt-10 max-w-2xl">
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            {description}
          </p>

          <p className="text-muted-foreground/80 mt-8 font-mono text-xs">
            {tech.join(" / ")}
          </p>
        </div>
      </article>
    </Container>
  );
}

function Action({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground hover:text-muted-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors"
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden />
    </a>
  );
}
