"use client";

import { useRef } from "react";
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
  "border-line-strong text-muted hover:text-fg hover:bg-surface-2 relative z-10 inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs transition-[color,background-color,transform] duration-150 active:scale-[0.96] [&_svg]:size-3.5";

export function ProjectCard({ project, priority, className }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);

  // Feed the cursor position to CSS for the spotlight; no re-renders.
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group border-line hover:border-line-strong relative isolate grid gap-5 overflow-hidden rounded-xl border p-3 transition-colors duration-300 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6",
        className,
      )}
    >
      {/* Spotlight: a soft radial glow that follows the cursor. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), var(--spotlight), transparent 70%)",
        }}
      />

      <div className="bg-surface border-line relative aspect-[16/10] overflow-hidden rounded-lg border">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            priority={priority}
            sizes="(min-width: 640px) 240px, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:14px_14px]">
            <span className="font-display text-fg text-3xl">{project.title}</span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 font-mono text-[10.5px] leading-none text-white backdrop-blur-sm">
          {project.metric}
        </span>
      </div>

      <div className="flex min-w-0 flex-col pb-1 sm:py-1 sm:pr-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-fg text-[15px] font-medium leading-snug">
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

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="border-line text-subtle rounded border px-1.5 py-0.5 font-mono text-[10.5px]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
