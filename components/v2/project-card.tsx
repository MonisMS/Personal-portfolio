import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

import { ProjectImage } from "@/components/v2/project-image";
import { routes } from "@/lib/v2/config/routes";
import type { Project } from "@/lib/v2/types";

export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, tech, image, liveUrl, githubUrl, status } =
    project;

  // The title links to the case study when one exists, otherwise to the live
  // site. Never renders a link to a page that isn't there.
  const titleHref = project.caseStudy ? routes.project(slug) : liveUrl;
  const isInternal = Boolean(project.caseStudy);

  return (
    <article className="flex flex-col">
      {image ? (
        <div className="mb-4">
          <ProjectImage src={image} alt={`${title} screenshot`} />
        </div>
      ) : null}

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-foreground font-display text-xl leading-tight tracking-tight">
          {titleHref ? (
            <TitleLink href={titleHref} internal={isInternal}>
              {title}
            </TitleLink>
          ) : (
            title
          )}
        </h3>

        {status === "building" ? (
          <span className="text-muted-foreground shrink-0 text-xs">
            In development
          </span>
        ) : null}
      </div>

      {/* Tech sits directly under the title, slash-separated (ayushworks DNA). */}
      <p className="text-muted-foreground/80 mt-2 font-mono text-xs">
        {tech.join(" / ")}
      </p>

      <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-relaxed">
        {summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {liveUrl ? (
          <ExternalAction href={liveUrl} icon={ExternalLink}>
            Live Preview
          </ExternalAction>
        ) : null}
        {githubUrl ? (
          <ExternalAction href={githubUrl} icon={Github}>
            Repo Url
          </ExternalAction>
        ) : null}
        {project.caseStudy ? (
          <Link
            href={routes.project(slug)}
            className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline"
          >
            Case study
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function TitleLink({
  href,
  internal,
  children,
}: {
  href: string;
  internal: boolean;
  children: React.ReactNode;
}) {
  const className =
    "underline-offset-4 transition-colors hover:text-muted-foreground";

  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function ExternalAction({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
    >
      <Icon className="size-3.5" />
      {children}
    </a>
  );
}
