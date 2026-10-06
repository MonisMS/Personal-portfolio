import { ArrowUpRight, GitMerge } from "lucide-react";
import type { PullRequest } from "@/lib/site/open-source";

export const rowClass =
  "group hover:bg-surface -mx-3 flex items-start gap-4 rounded-lg px-3 py-3 transition-colors duration-150";

export const arrow = (
  <ArrowUpRight className="text-subtle group-hover:text-fg mt-0.5 size-4 shrink-0 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
);

function formatMonth(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function PullRequestList({ pullRequests }: { pullRequests: PullRequest[] }) {
  return (
    <ul>
      {pullRequests.map((pr) => (
        <li key={pr.url}>
          <a href={pr.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span className="border-line bg-surface text-muted flex size-8 shrink-0 items-center justify-center rounded-md border">
              <GitMerge className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-fg truncate text-sm">{pr.title}</p>
              <p className="text-subtle mt-0.5 font-mono text-[11px]">
                {pr.repo} #{pr.number} · {formatMonth(pr.mergedAt)}
              </p>
            </div>
            {arrow}
          </a>
        </li>
      ))}
    </ul>
  );
}
