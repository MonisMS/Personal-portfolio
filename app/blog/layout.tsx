import type { Metadata } from "next";
import "highlight.js/styles/github-dark.css";

// Hidden until there's new writing: reachable by URL, kept out of search.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
