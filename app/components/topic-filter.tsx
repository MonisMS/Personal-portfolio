"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TopicFilterProps {
  tags: Array<{ tag: string; count: number }>;
  totalCount?: number;
  className?: string;
}

export function TopicFilter({ tags, totalCount, className }: TopicFilterProps) {
  const activeTag = useSearchParams().get("tag");
  const linkClass = (active: boolean) => cn(
    "inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-sm transition-colors",
    active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg",
  );

  return (
    <nav aria-label="Blog topics" className={cn("flex flex-wrap gap-1", className)}>
      <Link href="/blog" aria-current={!activeTag ? "page" : undefined} className={linkClass(!activeTag)}>
        <span>All</span>
        {totalCount !== undefined && <span>({totalCount})</span>}
      </Link>
      {tags.map(({ tag, count }) => (
        <Link
          key={tag}
          href={`/blog?tag=${encodeURIComponent(tag)}`}
          aria-current={activeTag === tag ? "page" : undefined}
          className={linkClass(activeTag === tag)}
        >
          <span>#{tag}</span>
          <span>({count})</span>
        </Link>
      ))}
    </nav>
  );
}
