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
    <section className="bg-black px-4 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Recent Blogs
          </h2>
          <p className="mt-3 text-neutral-400">
            Thoughts, learnings, and things I find interesting.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-800/50"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-white group-hover:text-neutral-100">
                  {blog.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400 line-clamp-2">
                  {blog.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="shrink-0 text-neutral-600 transition-colors group-hover:text-white"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
