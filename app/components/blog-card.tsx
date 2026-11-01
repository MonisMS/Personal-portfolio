import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  readingTime: number;
}

interface BlogCardProps {
  post: BlogPostMetadata;
  featured?: boolean;
  className?: string;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <article className={cn("border-line border-b py-8 sm:py-10", className)}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group grid min-w-0 gap-6 rounded-sm",
          post.image && "sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-10",
        )}
      >
        {post.image && (
          <div className="bg-surface relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority={featured}
              sizes="(min-width: 640px) 320px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-col justify-center">
          <h3 className={cn("font-display text-fg font-normal leading-tight group-hover:underline underline-offset-4", featured ? "text-3xl sm:text-4xl" : "text-3xl")}>
            {post.title}
          </h3>
          <p className="text-muted mt-4 max-w-[65ch] text-base leading-relaxed">{post.description}</p>
          <div className="text-subtle mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} min read</span>
          </div>
          {post.tags.length > 0 && (
            <ul aria-label="Topics" className="text-subtle mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {post.tags.map((tag) => <li key={tag}>#{tag}</li>)}
            </ul>
          )}
          <span className="text-fg mt-5 text-sm underline underline-offset-4">Read article</span>
        </div>
      </Link>
    </article>
  );
}
