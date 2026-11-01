"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

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
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get reading time text
function getReadingTimeText(minutes: number): string {
  return `${minutes} min read`;
}

// Get first letter for typography thumbnail
function getInitial(title: string): string {
  return title.charAt(0).toUpperCase();
}

// Get primary tag color gradient - neutral for regular posts, red only for featured
function getPrimaryTagColor(tag: string, isFeatured: boolean = false): string {
  if (isFeatured) {
    // Red gradient for featured
    return "from-accent/40 to-accent/20";
  }
  // Neutral/darker gradient for regular posts
  return "from-zinc-200/40 to-zinc-300/20 dark:from-zinc-800/40 dark:to-zinc-900/20";
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const primaryTag = post.tags[0] || "blog";
  const thumbnailColor = getPrimaryTagColor(primaryTag, featured);

  return (
    <article className="h-full">
      <Link href={`/blog/${post.slug}`}>
        <div className="group flex flex-col rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 cursor-pointer h-full">
          {/* Thumbnail - Typography-based with image support */}
          <div className="relative aspect-video w-full overflow-hidden bg-bg-secondary">
            {post.image ? (
              <>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-90" />
              </>
            ) : (
              <>
                {/* Typography-based thumbnail - neutral for regular posts */}
                <div className={`absolute inset-0 bg-gradient-to-br ${thumbnailColor} ${featured ? 'group-hover:from-accent/50 group-hover:to-accent/30' : 'group-hover:from-zinc-300/50 group-hover:to-zinc-400/30 dark:group-hover:from-zinc-700/50 dark:group-hover:to-zinc-800/30'} transition-all duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-6xl md:text-7xl font-black ${featured ? 'text-accent/40 group-hover:text-accent/60' : 'text-text-muted/20 group-hover:text-text-muted/40'} transition-colors select-none`}>
                    {getInitial(post.title)}
                  </div>
                </div>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80" />
              </>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 -mt-6 relative z-10">
            {/* Tags - Red only for featured, neutral for regular */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                      featured 
                        ? 'bg-accent/10 text-accent border-accent/30 group-hover:bg-accent/20 group-hover:border-accent/50'
                        : 'bg-bg-secondary/50 text-text-muted border-border group-hover:bg-bg-secondary group-hover:border-text-muted/30'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title - Louder, bigger */}
            <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent transition-colors mb-3 leading-tight tracking-tight">
              {post.title}
            </h3>

            {/* Description - Reduced opacity */}
            <p className="text-text-secondary/70 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
              {post.description}
            </p>

            {/* Meta information - Quieter */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-4 text-xs text-text-muted/60">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-accent/40" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-accent/40" />
                  <span>{getReadingTimeText(post.readingTime)}</span>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold transition-colors group/link ${
                featured 
                  ? 'text-accent group-hover:text-accent-dark'
                  : 'text-text-muted group-hover:text-text-primary'
              }`}>
                <span>Read</span>
                <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}