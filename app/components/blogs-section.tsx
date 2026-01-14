import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogsSection() {
  return (
    <section id="blog" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Writing</h2>
          <p className="mt-2 text-text-secondary">
            Thoughts, learnings, and tutorials about web development, blockchain, and technology.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="group inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-accent-dark"
          >
            <span>Read All Posts</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="mt-4 text-sm text-text-muted">
            {/* You can add a post count here later */}
            Latest articles and insights
          </p>
        </div>
      </div>
    </section>
  );
}
