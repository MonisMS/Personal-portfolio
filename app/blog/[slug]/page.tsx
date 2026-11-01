import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { ReadingProgress } from "@/app/components/reading-progress";
import { getPostBySlug, getAllPosts, formatDate, getReadingTimeText } from "@/lib/blog";
import { BlogContent } from "@/app/components/blog-content";

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
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="site-container">
      <ReadingProgress />
      <PageHeader backHref="/blog" backLabel="Back to blog" />
      <main id="main">
        <article className="mx-auto max-w-[65ch]">
          <header className="page-intro border-line border-b pb-10">
            <h1 className="page-title !text-[clamp(2.5rem,5vw,4rem)] !leading-[1.08]">
              {post.title}
            </h1>
            <p className="page-lead mt-6">{post.description}</p>
            <div className="text-muted mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{getReadingTimeText(post.readingTime)}</span>
              <span>By {post.author}</span>
            </div>
            {post.tags.length > 0 && (
              <ul aria-label="Topics" className="text-muted mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </header>

          <div className="article-body py-10 sm:py-14">
            <BlogContent content={post.content} />
          </div>

          <footer className="border-line flex flex-wrap items-center justify-between gap-5 border-t py-8">
            <Link href="/blog" className="site-button">
              <ArrowLeft aria-hidden className="size-4" />
              All posts
            </Link>
            <p className="text-muted text-sm">Written by {post.author}</p>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}
