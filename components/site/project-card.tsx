"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/site/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  className?: string;
}

const actionClass =
  "border-line-strong text-muted hover:text-fg hover:bg-surface-2 relative z-10 inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs transition-[color,background-color,transform] duration-150 ease-snappy active:scale-[0.96] [&_svg]:size-3.5 before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-['']";

export function ProjectCard({ project, priority, className }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Touch screens can't hover: colour the screenshot while the card sits in
  // the middle of the screen instead.
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className={cn(
        "group border-fg/20 hover:border-fg/45 focus-within:border-fg/45 relative isolate grid gap-5 overflow-hidden rounded-xl border border-dashed p-3 transition-colors duration-300 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6",
        className,
      )}
    >
      <div className="bg-surface border-line relative aspect-[16/10] overflow-hidden rounded-lg border">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            priority={priority}
            sizes="(min-width: 640px) 240px, 100vw"
            className="object-cover object-top grayscale transition-[filter] duration-[350ms] ease-out group-hover:grayscale-0 group-focus-within:grayscale-0 group-data-[in-view=true]:grayscale-0 motion-reduce:transition-none"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:14px_14px]">
            <span className="font-display text-fg text-3xl">{project.title}</span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 font-mono text-[0.65625rem] leading-none text-white backdrop-blur-sm">
          {project.metric}
        </span>
      </div>

      <div className="flex min-w-0 flex-col pb-1 sm:py-1 sm:pr-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-fg text-[0.9375rem] font-medium leading-snug">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {project.title}
              </Link>
            </h3>
            <p className="text-subtle mt-0.5 text-xs">{project.context}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass}
                aria-label={`${project.title} live demo`}
              >
                <ArrowUpRight />
                Live
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
              aria-label={`${project.title} source code`}
            >
              <SiGithub />
              Code
            </a>
          </div>
        </div>

        <p className="text-muted mt-3 text-sm leading-relaxed">
          {project.description}
        </p>

        <p className="text-subtle mt-4 font-mono text-[0.6875rem]">
          {project.tech.join(" / ")}
        </p>
      </div>
    </article>
  );
}
