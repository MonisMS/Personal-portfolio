import type { Metadata } from "next";

import { Footer } from "@/components/v2/footer";
import { Navbar } from "@/components/v2/navbar";
import { hero } from "@/lib/v2/config/hero";
import { routes } from "@/lib/v2/config/routes";
import { site } from "@/lib/v2/config/site";

const title = `${site.name} — ${hero.tagline}`;
const description =
  "Backend-focused full-stack developer. I build products where the hard part is the backend — ingestion pipelines, autonomous agents, and data models that hold up in production.";

export const metadata: Metadata = {
  // Child pages (case studies) supply just their name; the template adds the
  // suffix. `default` is used by the landing page itself.
  title: { default: title, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "Monis Sarwar",
    "full-stack developer",
    "backend developer",
    "software engineer",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
  ],
  alternates: { canonical: routes.home },
  openGraph: {
    type: "website",
    title,
    description,
    url: routes.home,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2 flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
