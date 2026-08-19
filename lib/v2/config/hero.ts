import { site } from "./site";

/**
 * Drafted from your REAL projects (Curio + Nivora) — every specific here is
 * traceable to `config/projects.ts`, nothing invented. Read it aloud: if the
 * voice isn't yours, edit it. This is the highest-leverage copy on the site.
 *
 * Emphasis: wrap the few words that carry weight in **double asterisks** — they
 * render bold-white against the gray paragraph. That contrast is the only
 * emphasis on the page; keep it to 2–3 words per paragraph.
 */
export const hero = {
  tagline: "Backend-focused full-stack developer",

  intro: [
    "I build full-stack products where the hard part lives in the **backend** — ingestion pipelines, autonomous agents, and data models that hold up under real load.",
    "Recent work: an article aggregator that ranks **60+ RSS sources** by how people actually read them, and an agent that routes civic complaints and **escalates on its own** when SLAs slip.",
    "I care about the parts that never show in a demo — per-source timeouts, HMAC-signed links, timezone-aware delivery — the details that decide whether software **survives production**.",
  ],

  // The one status line on the page. Green-dot + "Open to Work" pattern.
  openToWork: {
    label: "Open to Work",
    detail: "Full-Time, Freelance, or Collabs.",
    cta: { label: "Let's talk.", href: `mailto:${site.email}` },
  },

  avatar: {
    src: "/profile-pic-1.jpeg",
    alt: "Portrait of Syed Monis Sarwar",
    // Real photos only — the thumbnail strip cycles these two under CSS filters
    // (Photo Booth-style). Add more real shots here to lengthen the session.
    shots: ["/profile-pic-1.jpeg", "/profile-pic.jpg"],
  },

  actions: {
    primary: { label: "Resume", href: "/resume" },
    secondary: { label: "Book a call", href: site.calUrl },
  },
} as const;
