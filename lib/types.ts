
import { ReactNode } from "react";

export interface NavItem {
  label: string;
  id: string;
  href: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  isBuilding?: boolean;
  image?: string;
}

export interface Skill {
  name: string;
  // We will store the icon name string here and map it in the component 
  // to avoid serializing React nodes in data files if possible, 
  // but for simplicity in this refactor keeping it as ReactNode in the type 
  // is fine if we keep the data file as .tsx.
  // However, .ts data files are better. Let's try to keep data separate from view.
  // But for icons from react-icons, we need the component.
  // So `lib/data.tsx` is acceptable for a portfolio.
  icon: ReactNode;
}
