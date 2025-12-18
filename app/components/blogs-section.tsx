import { ArrowUpRight } from "lucide-react";

const blogs = [
  {
    title: "How to Explain Web3 to Your Friends Without Sounding Like a Scammer",
    description: "A guide to explaining Web3 concepts simply and effectively.",
    date: "Dec 2024",
    url: "https://monisdev.hashnode.dev/how-to-explain-web3-to-your-friends-without-sounding-like-a-scammer",
  },
  {
    title: "Smart Contracts 101: The Digital Agreements of the Crypto World",
    description: "Understanding the fundamentals of smart contracts and how they work.",
    date: "Nov 2024",
    url: "https://monisdev.hashnode.dev/smart-contracts-101-the-digital-agreements-of-the-crypto-world",
  },
  {
    title: "The Ultimate Beginner's Guide to Alternative Chains",
    description: "Exploring different blockchain networks beyond Ethereum and Bitcoin.",
    date: "Oct 2024",
    url: "https://monisdev.hashnode.dev/the-ultimate-beginners-guide-to-alternative-chains",
  },
];

export function BlogsSection() {
  return (
    <section id="blog" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary">Writing</h2>
          <p className="mt-2 text-text-secondary">
            Thoughts, learnings, and tutorials published on{" "}
            <a
              href="https://monisdev.hashnode.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Hashnode
            </a>
            .
          </p>
        </div>

        <div className="space-y-3">
          {blogs.map((blog, i) => (
            <a
              key={i}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
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
