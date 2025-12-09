"use client";

import { ArrowUpRight } from "lucide-react";

interface Blog {
  title: string;
  description: string;
  date: string;
  readTime: string;
  url: string;
}

const blogs: Blog[] = [
  {
    title: "How I Built My Portfolio with Next.js",
    description:
      "A walkthrough of my portfolio site architecture, design decisions, and lessons learned along the way.",
    date: "Dec 2024",
    readTime: "5 min read",
    url: "https://dev.to",
  },
  {
    title: "Understanding JWT Authentication",
    description:
      "Deep dive into JSON Web Tokens, how they work, and best practices for secure authentication.",
    date: "Nov 2024",
    readTime: "8 min read",
    url: "https://dev.to",
  },
  {
    title: "My Developer Journey So Far",
    description:
      "Reflections on learning to code, building projects, and what keeps me motivated.",
    date: "Oct 2024",
    readTime: "4 min read",
    url: "https://dev.to",
  },
];

export function BlogsSection() {
  return (
    <section className="bg-bg-primary px-4 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-accent mb-3">Writing</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-text-primary">
            Recent Blogs
          </h2>
          <p className="mt-3 text-text-secondary">
            Thoughts, learnings, and things I find interesting.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="space-y-4 stagger-children">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-bg-card p-5 transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
                  {blog.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="text-accent">{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="shrink-0 text-text-muted transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
