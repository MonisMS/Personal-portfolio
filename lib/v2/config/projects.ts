import type { Project } from "../types";

/**
 * `summary` is condensed from the v1 descriptions — verify each one still
 * reads true to you.
 *
 * TODO(monis): every `meta` field is blank because I don't have the real
 * values. Fill in year / role / team / timeline, or we drop the fields.
 * Do not ship guessed values here — recruiters ask about them in interviews.
 */
export const projects: Project[] = [
  {
    slug: "curio",
    title: "Curio",
    summary:
      "Article aggregator that ranks 60+ RSS sources by how people actually read them.",
    description:
      "Full-stack personalized article aggregator with topic-based feeds and quality-ranked RSS ingestion across 60+ sources. Built a source scoring system that blends bookmark and read rates into feed ranking, parallel ingestion with per-source timeouts, and scheduled email digests with timezone-aware delivery and HMAC-signed unsubscribe links.",
    tech: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Resend", "Tailwind"],
    image: "/article-it.jpg",
    liveUrl: "https://curio-sity.vercel.app/",
    githubUrl: "https://github.com/MonisMS/article-it",
    featured: true,
    status: "shipped",
    caseStudy: true,
    meta: { year: "", role: "", team: "", timeline: "" },
  },
  {
    slug: "nivora",
    title: "Nivora",
    summary:
      "Autonomous agent that routes civic complaints, tracks SLAs, and escalates on its own.",
    description:
      "An autonomous AI agent for civic grievance redressal. Classifies citizen complaints, routes them to the right department with an SLA, and autonomously escalates with a firmer re-drafted complaint when deadlines are breached — keeping citizens updated in vernacular Hindi throughout.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Drizzle", "PostgreSQL", "Tailwind"],
    image: "/nivora.png",
    liveUrl: "https://nivora-seven.vercel.app",
    githubUrl: "https://github.com/MonisMS/nivora",
    featured: true,
    status: "shipped",
    caseStudy: true,
    meta: { year: "", role: "", team: "", timeline: "" },
  },
  {
    slug: "foldermage",
    title: "FolderMage",
    summary:
      "Desktop file organizer with deep directory scanning, SHA-256 dedupe, and undoable history.",
    description:
      "A smart file organizer in active development with deep directory scanning, automated categorization, SHA-256 duplicate detection, and an undoable history system.",
    tech: ["Fastify", "Drizzle", "Redis", "Next.js", "Electron", "Docker", "PM2"],
    image: "/foldermage.png",
    liveUrl: "https://folder-organizer-frontend-k7r8.vercel.app/",
    githubUrl: "https://github.com/MonisMS",
    featured: true,
    status: "building",
    caseStudy: true,
    meta: { year: "", role: "", team: "", timeline: "" },
  },
  {
    slug: "askai",
    title: "AskAI",
    summary:
      "Turns meeting recordings and documents into summaries and action items.",
    description:
      "Your personal AI assistant that answers questions, processes meetings, and summarizes content in real-time. Upload recordings or documents, and let AI extract key insights and action items for you.",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL"],
    image: "/ask-ai.png",
    liveUrl: "https://askai-nu.vercel.app/",
    githubUrl: "https://github.com/MonisMS/askai",
    featured: false,
    status: "shipped",
    caseStudy: true,
    meta: { year: "", role: "", team: "", timeline: "" },
  },
  {
    slug: "pharmaguard",
    title: "PharmaGuard",
    summary:
      "Scores drug safety from patient genetic data against CPIC guidelines.",
    description:
      "A pharmacogenomic risk prediction system that analyzes patient genetic data (VCF files) against CPIC guidelines. Returns deterministic drug safety assessments with AI-generated clinical explanations. Built for the RIFT 2026 hackathon.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    image: "/pharmaguard.png",
    liveUrl: "https://photonx-rift-2026.vercel.app/",
    githubUrl: "https://github.com/MonisMS/photonx-rift-2026",
    featured: false,
    status: "shipped",
    caseStudy: true,
    meta: { year: "2026", role: "", team: "", timeline: "" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
