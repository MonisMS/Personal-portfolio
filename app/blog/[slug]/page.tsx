import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getPostBySlug, getAllPosts, formatDate, getReadingTimeText } from "@/lib/blog";
import { BlogContent } from "../../components/blog-content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Syed Monis Sarwar`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image && { images: [post.image] }),
    },
  };
}

import { ReadingProgress } from "../../components/reading-progress";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="bg-bg-primary">
      <ReadingProgress />
      <article className="px-4 pt-24 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-text-secondary/70 mb-8 leading-relaxed">
              {post.description}
            </p>
            
            {/* Meta - Quieter */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted/60 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-accent/40" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-accent/40" />
                <span>{getReadingTimeText(post.readingTime)}</span>
              </div>
              <div>
                by <span className="text-text-secondary">{post.author}</span>
              </div>
            </div>

            {/* Tags - Red accent committed */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-invert">
            <BlogContent content={post.content} />
          </div>

          {/* Footer - Red accent committed */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-accent/30 hover:border-accent hover:bg-accent/10 text-accent font-semibold transition-all duration-200"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                All posts
              </Link>
              
              <div className="text-sm text-text-muted/60">
                Written by <span className="text-text-secondary">{post.author}</span>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}