import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { BlogCard } from "../components/blog-card";
import { TopicFilter } from "../components/topic-filter";
import { ScrollAnimation } from "../components/scroll-animation";
import { getAllPosts, getTagsWithCount, getFeaturedPost } from "@/lib/blog";
import type { BlogPostMetadata } from "../components/blog-card";
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Syed Monis Sarwar",
  description: "Thoughts, learnings, and tutorials about web development, blockchain, and technology.",
};

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const posts = getAllPosts();
  const tagsWithCount = getTagsWithCount();
  const featuredPost = getFeaturedPost();
  
  // Filter posts by tag if provided
  let regularPosts = featuredPost ? posts.filter(p => p.slug !== featuredPost.slug) : posts;
  if (params.tag) {
    regularPosts = regularPosts.filter(post => post.tags.includes(params.tag!));
  }

  return (
    <main className="bg-bg-primary">
      {/* Header */}
      <section className="relative px-4 pt-24 pb-12 md:px-12 lg:px-20">
        {/* Soft Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        
        <div className="mx-auto max-w-4xl">
          <div className="mb-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Blog
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Post Section - Medium Size */}
      {featuredPost && (
        <section className="px-4 pb-8 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <ScrollAnimation delay={0.1}>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="text-accent" size={16} />
                <h2 className="text-base font-bold text-text-primary">Start Here</h2>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.15}>
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group relative rounded-xl border border-accent/50 bg-bg-card overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-0.5">
                  <div className="relative flex flex-col md:flex-row gap-0">
                    {/* Thumbnail - Left */}
                    <div className="relative w-full md:w-[200px] aspect-video md:aspect-square overflow-hidden bg-gradient-to-br from-accent/50 to-accent/30 group-hover:from-accent/60 group-hover:to-accent/40 transition-all shrink-0">
                      {featuredPost.image ? (
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-black text-accent/40 group-hover:text-accent/50 transition-colors select-none">
                            {featuredPost.title.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content - Right */}
                    <div className="flex-1 p-5 flex flex-col justify-center">
                      <div className="mb-2.5 flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/30">
                          Featured
                        </span>
                        <span className="text-xs text-text-muted/60">{new Date(featuredPost.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <span className="text-xs text-text-muted/60">{featuredPost.readingTime} min read</span>
                      </div>
                      <h2 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-2 leading-tight line-clamp-2">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm text-text-secondary/70 leading-relaxed mb-3 line-clamp-2">
                        {featuredPost.description}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                        <span>Read</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* Tags Section - Above posts, with counts and filtering */}
      {tagsWithCount.length > 0 && (
        <section className="px-4 pb-12 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <ScrollAnimation delay={0.1}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Topics</h2>
                <p className="text-sm text-text-secondary mt-1">Filter posts by category</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <Suspense fallback={<div className="flex flex-wrap gap-3">Loading topics...</div>}>
                <TopicFilter tags={tagsWithCount} />
              </Suspense>
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="px-4 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {regularPosts.length > 0 ? (
            <>
              <ScrollAnimation delay={0.1}>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">All Posts</h2>
                  <p className="text-sm text-text-secondary mt-1">({regularPosts.length} {regularPosts.length === 1 ? 'post' : 'posts'})</p>
                </div>
              </ScrollAnimation>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, index) => (
                  <ScrollAnimation key={post.slug} delay={0.1 + index * 0.1}>
                    <BlogCard post={post as BlogPostMetadata} />
                  </ScrollAnimation>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6 rounded-full bg-bg-card p-6 w-fit mx-auto">
                <div className="text-4xl">📝</div>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary mb-2">
                No posts yet
              </h2>
              <p className="text-text-secondary">
                Check back soon for new content!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}