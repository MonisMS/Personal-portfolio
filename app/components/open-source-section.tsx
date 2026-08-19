import { ArrowUpRight } from "lucide-react";

import { OPEN_SOURCE_DATA } from "@/lib/data";
import type { Contribution } from "@/lib/types";

export function OpenSourceSection() {
  if (OPEN_SOURCE_DATA.length === 0) return null;

  return (
    <section id="open-source" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Open Source
          </h2>
          <p className="max-w-lg text-text-secondary">
            Merged contributions to projects I don&apos;t own.
          </p>
        </div>

        <ol className="space-y-8">
          {OPEN_SOURCE_DATA.map((contribution, index) => (
            <li key={`${contribution.project}-${index}`}>
              <Entry contribution={contribution} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Entry({ contribution }: { contribution: Contribution }) {
  const { project, repoUrl, summary, prUrl, prLabel } = contribution;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-semibold text-text-primary">
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {project}
            </a>
          ) : (
            project
          )}
        </h3>

        <a
          href={prUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-accent"
        >
          {prLabel || "View PR"}
          <ArrowUpRight className="size-3" aria-hidden />
        </a>
      </div>

      <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">
        {summary}
      </p>
    </div>
  );
}
