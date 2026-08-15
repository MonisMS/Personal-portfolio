export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** lucide-react icon name, resolved in the component layer. */
  icon: "github" | "linkedin" | "twitter" | "instagram" | "mail";
}

export interface Project {
  slug: string;
  title: string;
  /** One line. What it does, for someone scanning. */
  summary: string;
  /** The longer pitch. Shown on the case-study page, not the card. */
  description: string;
  tech: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "shipped" | "building";
  /** Flip to true once `/v2/projects/<slug>` exists. Guards against dead links. */
  caseStudy?: boolean;
  /** Case-study metadata. Recruiters read these first. */
  meta: {
    year?: string;
    role?: string;
    team?: string;
    timeline?: string;
  };
}

export interface Contribution {
  /** The project you contributed to. */
  project: string;
  /** Link to the project / repo. */
  repoUrl?: string;
  /** One line: what you changed and why it mattered. */
  summary: string;
  /** The merged PR — the verifiable proof. Required to ship in production. */
  prUrl?: string;
  /** Short PR label, e.g. "#1234" or a title. Falls back to "View PR". */
  prLabel?: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  /** e.g. "2024 — Present" */
  period: string;
  description: string;
  href?: string;
  current?: boolean;
}
