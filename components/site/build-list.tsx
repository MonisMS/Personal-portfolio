"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { arrow, rowClass } from "./link-list";
import type { Build } from "@/lib/site/projects";
import { cn } from "@/lib/utils";

interface BuildListProps {
  builds: Build[];
  /** How many to show before "Show all". */
  initial?: number;
  className?: string;
}

export function BuildList({ builds, initial = 3, className }: BuildListProps) {
  const [expanded, setExpanded] = useState(false);
  const hidden = builds.length - initial;
  const visible = expanded ? builds : builds.slice(0, initial);

  return (
    <div className={className}>
      <ul id="build-list">
        {visible.map((build, i) => (
          <li
            key={build.title}
            className={cn(i >= initial && "rise")}
            style={i >= initial ? ({ "--i": i - initial } as React.CSSProperties) : undefined}
          >
            <a
              href={build.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              <div className="min-w-0 flex-1">
                <p className="text-fg text-sm font-medium">{build.title}</p>
                <p className="text-muted mt-1 text-sm leading-relaxed">
                  {build.description}
                </p>
                <p className="text-subtle mt-1.5 font-mono text-[0.6875rem]">
                  {build.tech.join(" / ")}
                </p>
              </div>
              {arrow}
            </a>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="build-list"
          className="text-muted hover:text-fg mt-3 inline-flex items-center gap-1.5 text-sm transition-[color,transform] duration-150 ease-snappy active:scale-[0.97]"
        >
          {expanded ? "Show less" : `Show all (${builds.length})`}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>
      )}
    </div>
  );
}
