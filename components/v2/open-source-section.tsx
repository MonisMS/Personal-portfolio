import { ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/v2/section";
import { Todo, showPlaceholders } from "@/components/v2/todo";
import { openSource } from "@/lib/v2/config/open-source";
import type { Contribution } from "@/lib/v2/types";

/**
 * A contribution is only shippable with a project, a summary and a merged-PR
 * link. In dev the gaps show as TODO chips; in production incomplete entries
 * drop, and an all-incomplete list renders nothing rather than an empty header.
 */
const isComplete = (c: Contribution) =>
  Boolean(c.project && c.summary && c.prUrl);

export function OpenSourceSection() {
  const items = showPlaceholders ? openSource : openSource.filter(isComplete);
  if (items.length === 0) return null;

  return (
    <Section id="open-source">
      <SectionHeading title="Open source" />
      <ol className="space-y-7">
        {items.map((contribution, index) => (
          <li key={`${contribution.project}-${index}`}>
            <Entry contribution={contribution} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Entry({ contribution }: { contribution: Contribution }) {
  const { project, repoUrl, summary, prUrl, prLabel } = contribution;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-foreground text-[15px] font-medium">
          {project ? (
            repoUrl ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline-offset-4 transition-colors hover:underline"
              >
                {project}
              </a>
            ) : (
              project
            )
          ) : (
            <Todo>project / repo</Todo>
          )}
        </h3>

        {prUrl ? (
          <a
            href={prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1 font-mono text-xs transition-colors"
          >
            {prLabel || "View PR"}
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
        ) : showPlaceholders ? (
          <Todo>merged PR link</Todo>
        ) : null}
      </div>

      {summary ? (
        <p className="text-muted-foreground mt-1.5 text-[15px] leading-relaxed">
          {summary}
        </p>
      ) : showPlaceholders ? (
        <p className="mt-1.5">
          <Todo>what you changed — one line</Todo>
        </p>
      ) : null}
    </div>
  );
}
