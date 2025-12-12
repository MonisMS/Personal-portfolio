import { ArrowUpRight } from "lucide-react";

const blogs = [
  {
    title: "How I Built My Portfolio with Next.js 15",
    description: "A look at the tech stack, design decisions, and lessons learned.",
    date: "Dec 2024",
    url: "#",
  },
  {
    title: "Understanding TypeScript Generics",
    description: "Breaking down generics with practical examples.",
    date: "Nov 2024",
    url: "#",
  },
  {
    title: "My Developer Setup in 2024",
    description: "Tools, extensions, and workflows I use daily.",
    date: "Oct 2024",
    url: "#",
  },
];

export function BlogsSection() {
  return (
    <section id="blog" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Blog</h2>
          <p className="mt-2 text-text-secondary">Writing about code and things I learn.</p>
        </div>

        <div className="space-y-3">
          {blogs.map((blog, i) => (
            <a
              key={i}
              href={blog.url}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-bg-card p-5 hover:border-accent/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-text-primary group-hover:text-accent">
                    {blog.title}
                  </h3>
                  <span className="text-xs text-text-muted">{blog.date}</span>
                </div>
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
