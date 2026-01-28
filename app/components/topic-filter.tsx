"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TopicFilterProps {
  tags: Array<{ tag: string; count: number }>;
}

export function TopicFilter({ tags }: TopicFilterProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/blog"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
          !activeTag
            ? "border-accent/50 bg-accent/10 text-accent hover:border-accent hover:bg-accent/20 hover:shadow-accent/5"
            : "border-border bg-bg-secondary/50 text-text-secondary hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
        }`}
      >
        <span>All</span>
        <span className="text-xs text-text-muted">({tags.reduce((sum, t) => sum + t.count, 0)})</span>
      </Link>
      {tags.map(({ tag, count }) => (
        <Link
          key={tag}
          href={`/blog?tag=${tag}`}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            activeTag === tag
              ? "border-accent/50 bg-accent/10 text-accent hover:border-accent hover:bg-accent/20 hover:shadow-accent/5"
              : "border-border bg-bg-secondary/50 text-text-secondary hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
          }`}
        >
          <span>#{tag}</span>
          <span className={`text-xs ${activeTag === tag ? 'text-accent/70' : 'text-text-muted'}`}>({count})</span>
        </Link>
      ))}
    </div>
  );
}

