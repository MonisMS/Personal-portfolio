import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/app/components/blog-card";
import { TopicFilter } from "@/app/components/topic-filter";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { getAllPosts, getTagsWithCount } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, learnings, and tutorials about web development, blockchain, and technology.",
  alternates: { canonical: "/blog" },
};

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const posts = getAllPosts();
  const tagsWithCount = getTagsWithCount();
  const visiblePosts = tag ? posts.filter((post) => post.tags.includes(tag)) : posts;

  return (
    <div className="site-container">
      <PageHeader />
      <main id="main">
        <header className="page-intro">
          <h1 className="page-title">Blog</h1>
          <p className="page-lead">Thoughts, learnings, and tutorials about web development, blockchain, and technology.</p>
        </header>

        {tagsWithCount.length > 0 && (
          <section aria-label="Filter posts by topic" className="border-line border-y py-4">
            <Suspense fallback={<p className="text-muted text-sm">Loading topics…</p>}>
              <TopicFilter tags={tagsWithCount} totalCount={posts.length} />
            </Suspense>
          </section>
        )}

        <section aria-labelledby="posts-title" className="pt-10 sm:pt-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="posts-title" className="font-display text-fg text-3xl font-normal">
              {tag ? `Posts tagged ${tag}` : "All posts"}
            </h2>
            <p className="text-subtle text-sm" aria-live="polite">
              {visiblePosts.length} {visiblePosts.length === 1 ? "post" : "posts"}
            </p>
          </div>
          {visiblePosts.length > 0 ? (
            <div>
              {visiblePosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} featured={!tag && index === 0} />
              ))}
            </div>
          ) : (
            <div className="py-12">
              <p className="text-muted mb-5">No posts match this topic.</p>
              <Link href="/blog" className="site-button">View all posts</Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
