import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastify,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiVercel,
  SiPrisma,
  SiGraphql,
  SiDrizzle,
  SiBun,
  SiOpenai,
  SiFramer,
  SiZod,
  SiResend,
  SiElectron,
  SiPm2,
  SiShadcnui,
  SiRadixui,
} from "react-icons/si";
import { RiStackLine } from "react-icons/ri";
import { NavItem, ExperienceItem, Project, Skill } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home", href: "/#home" },
  { label: "Projects", id: "projects", href: "/#projects" },
  { label: "Skills", id: "skills", href: "/#skills" },
  { label: "Background", id: "about", href: "/#about" },
  { label: "Blog", id: "blog", href: "/blog" },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Personal Work",
    period: "2025 - Present",
    description:
      "Building web applications, experimenting with new technologies, and shipping side projects.",
    current: true,
  },
  {
    role: "CS Student",
    company: "University",
    period: "2024 - Present",
    description:
      "Pursuing Computer Science, diving deep into algorithms, system design, and software engineering fundamentals.",
    current: true,
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    title: "AskAI",
    description:
      "Sit in a live meeting with an AI that hears every word of the conversation. When you're done, it hands the whole thing back summarized — the decisions made, the action items, the follow-ups. Forget a detail later? Just chat with it and ask; it remembers everything, so you never take notes again.",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL"],
    liveUrl: "https://askai-nu.vercel.app/",
    githubUrl: "https://github.com/MonisMS/askai",
    image: "/ask-ai.png"
  },
  {
    title: "Curio",
    description:
      "Full-stack personalized article aggregator with topic-based feeds and quality-ranked RSS ingestion across 60+ sources. Built a source scoring system that blends bookmark and read rates into feed ranking, parallel ingestion with per-source timeouts, and scheduled email digests with timezone-aware delivery and HMAC-signed unsubscribe links.",
    tech: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Resend", "Tailwind"],
    liveUrl: "https://curio-sity.vercel.app/",
    githubUrl: "https://github.com/MonisMS/article-it",
    image: "/article-it.jpg",
  },
  {
    title: "Nivora",
    description:
      "An autonomous AI agent for civic grievance redressal. Classifies citizen complaints, routes them to the right department with an SLA, and autonomously escalates with a firmer re-drafted complaint when deadlines are breached — keeping citizens updated in vernacular Hindi throughout.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Drizzle", "PostgreSQL", "Tailwind"],
    liveUrl: "https://nivora-seven.vercel.app",
    githubUrl: "https://github.com/MonisMS/nivora",
    image: "/nivora.png"
  },
  {
    title: "FolderMage",
    description:
      "A smart file organizer in active development with deep directory scanning, automated categorization, SHA-256 duplicate detection, and an undoable history system.",
    tech: ["Fastify", "Drizzle", "Redis", "Next.js", "Electron", "Docker", "PM2"],
    liveUrl: "https://folder-organizer-frontend-k7r8.vercel.app/",
    githubUrl: "https://github.com/MonisMS",
    isBuilding: true,
    image: "/foldermage.png"
  },
];

export const MORE_PROJECTS_DATA: Project[] = [
  {
    title: "PharmaGuard",
    description:
      "A pharmacogenomic risk prediction system that analyzes patient genetic data (VCF files) against CPIC guidelines. Returns deterministic drug safety assessments with AI-generated clinical explanations. Built for the RIFT 2026 hackathon.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "https://photonx-rift-2026.vercel.app/",
    githubUrl: "https://github.com/MonisMS/photonx-rift-2026",
    image: "/pharmaguard.png"
  },
];

export const ALL_PROJECTS_DATA: Project[] = [
  ...PROJECTS_DATA,
  ...MORE_PROJECTS_DATA,
];

export const SKILLS_DATA: Skill[] = [
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "TanStack", icon: <RiStackLine /> },
  { name: "shadcn/ui", icon: <SiShadcnui /> },
  { name: "Radix UI", icon: <SiRadixui /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Bun", icon: <SiBun /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "Fastify", icon: <SiFastify /> },
  { name: "Electron", icon: <SiElectron /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "OpenAI", icon: <SiOpenai /> },
  { name: "Zod", icon: <SiZod /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Drizzle", icon: <SiDrizzle /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Resend", icon: <SiResend /> },
  { name: "PM2", icon: <SiPm2 /> },
];
