import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiPrisma,
  SiGraphql,
  SiDrizzle,
  SiBun,
  SiFramer
} from "react-icons/si";
import { RiStackLine } from "react-icons/ri";
import { TbPolaroid } from "react-icons/tb";
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
      "Your personal AI assistant that answers questions, processes meetings, and summarizes content in real-time. Upload recordings or documents, and let AI extract key insights and action items for you.",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL"],
    liveUrl: "https://askai-nu.vercel.app/",
    githubUrl: "https://github.com/MonisMS/askai",
    image: "/ask-ai.png"
  },
  {
    title: "Article-It",
    description:
      "Full-stack personalized article aggregator with topic-based feeds and quality-ranked RSS ingestion across 60+ sources. Built a source scoring system that blends bookmark and read rates into feed ranking, parallel ingestion with per-source timeouts, and scheduled email digests with timezone-aware delivery and HMAC-signed unsubscribe links.",
    tech: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Resend", "Tailwind"],
    githubUrl: "https://github.com/MonisMS/article-it",
    image: "/article-it.jpg",
  },
  {
    title: "PharmaGuard",
    description:
      "A pharmacogenomic risk prediction system that analyzes patient genetic data (VCF files) against CPIC guidelines. Returns deterministic drug safety assessments with AI-generated clinical explanations. Built for the RIFT 2026 hackathon.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "https://photonx-rift-2026.vercel.app/",
    githubUrl: "https://github.com/MonisMS/photonx-rift-2026",
    image:"/pharmaguard.png"
  },
  {
    title: "FolderMage",
    description:
      "A smart file organizer in active development with deep directory scanning, automated categorization, SHA-256 duplicate detection, and an undoable history system.",
    tech: ["Fastify", "Drizzle", "Redis", "Next.js", "Electron", "Docker", "PM2"],
    githubUrl: "https://github.com/MonisMS",
    isBuilding: true,
    image: "/folder-mage.png"
  },
];

export const MORE_PROJECTS_DATA: Project[] = [];

export const ALL_PROJECTS_DATA: Project[] = [
  ...PROJECTS_DATA,
  ...MORE_PROJECTS_DATA,
];

export const SKILLS_DATA: Skill[] = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Bun", icon: <SiBun /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Drizzle", icon: <SiDrizzle /> },
  { name: "TanStack", icon: <RiStackLine /> },
  { name: "Git", icon: <SiGit /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "Polar", icon: <TbPolaroid /> },
];
