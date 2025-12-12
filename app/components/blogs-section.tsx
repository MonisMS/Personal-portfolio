import { ArrowUpRight } from "lucide-react";

// TODO: Replace with real blog posts when you start writing
const blogs = [
  {
    title: "Coming soon",
    description: "I'll be writing about web development, projects, and things I learn.",
    url: "#",
  },
];

export function BlogsSection() {
  // Hide section if no real blogs yet
  if (blogs.length === 1 && blogs[0].title === "Coming soon") {
    return null;
  }

  return (
    <section className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Writing</h2>
          <p className="mt-2 text-text-secondary">Notes and thoughts.</p>
        </div>

        <div className="space-y-3">
          {blogs.map((blog, i) => (
            <a
              key={i}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-bg-card p-5 hover:border-accent/50"
            >
              <div>
                <h3 className="font-semibold text-text-primary group-hover:text-accent">
                  {blog.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">{blog.description}</p>
              </div>
              <ArrowUpRight size={18} className="shrink-0 text-text-muted group-hover:text-accent" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
