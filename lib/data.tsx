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
    title: "FolderMage",
    description:
      "A desktop app that transforms your messy Downloads and cluttered folders into organized bliss. Features smart auto-sorting, undo functionality, background job queues, and a clean dashboard to keep everything in order.",
    tech: ["TypeScript", "Redis", "Docker"],
    githubUrl: "https://github.com/MonisMS/folder-organizer",
    isBuilding: true,
    image: "/folder-mage.png"
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
    title: "Beats Generator",
    description:
      "An AI-powered music generator that creates unique tunes using the Gemini API. Just describe the vibe you want, and it generates beats for you. Features a vinyl-inspired UI with full playback controls.",
    tech: ["React", "TypeScript", "Vite", "Tailwind"],
    liveUrl: "https://tunes-generator.vercel.app/",
    githubUrl: "https://github.com/MonisMS/Tunes-generator-",
    image: "/tunes-generator-image (2).png"
  },
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
