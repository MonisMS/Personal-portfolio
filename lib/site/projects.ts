/**
 * Every number in this file is real and traceable to the project's repo or
 * live site. Update them when the projects grow — never round them up.
 */

export interface Project {
  slug: string;
  title: string;
  /** One line, shown under the title. */
  tagline: string;
  /** Card copy: what it does and the hard part, 2–3 sentences. */
  description: string;
  /** The headline number, overlaid on the screenshot. */
  metric: string;
  /** Where it came from: hackathon, solo build, etc. */
  context: string;
  tech: string[];
  image?: string;
  liveUrl?: string;
  githubUrl: string;
  year: string;
  role: string;
  /** Case-study bullets: the engineering worth reading about. */
  highlights: string[];
  /** Honest caveat shown on the case study, e.g. a snapshot-mode demo. */
  note?: string;
}

export interface Build {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
}

export const projects: Project[] = [
  {
    slug: "apix",
    title: "APIx",
    tagline: "A daily airfare price index for India",
    description:
      "Collects airfares every day across 12 DGCA-weighted routes and 5 advance-purchase windows, then computes a Jevons/Young price index that reproduces MoSPI's published worked examples to four decimal places.",
    metric: "24,448 fares collected",
    context: "Solo build",
    tech: ["Python", "Next.js", "PostgreSQL", "GitHub Actions", "d3-geo"],
    image: "/projects/apix.webp",
    liveUrl: "https://apix-dashboard-gitbashers.vercel.app",
    githubUrl: "https://github.com/MonisMS/apix-dashboard",
    year: "2026",
    role: "Data pipeline, index engine & dashboard",
    highlights: [
      "Python collectors pull from four fare sources behind a rotating API-key pool, on a daily GitHub Actions cron.",
      "Index engine handles outlier cleaning, imputation for missing price cells and chaining across periods.",
      "The /methodology page reproduces MoSPI's four published worked examples to four decimal places.",
      "Digest verification and API-parity checks guard the public /api/v1, with a static snapshot fallback if the database is down.",
    ],
  },
  {
    slug: "curio",
    title: "Curio",
    tagline: "One reading feed from 275+ sources",
    description:
      "Topic-based feeds pulled from 275+ sources across 26 topics. Five scheduled jobs run ingestion, email digests, source-quality scoring, cleanup and re-engagement, and one slow feed never stalls a run.",
    metric: "275+ sources · 26 topics",
    context: "Solo · 71 commits",
    tech: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Resend", "GitHub Actions"],
    image: "/projects/curio.webp",
    liveUrl: "https://curio-sity.vercel.app",
    githubUrl: "https://github.com/MonisMS/article-it",
    year: "2026",
    role: "Solo: design, backend, infra",
    highlights: [
      "Parallel ingestion with Promise.allSettled and an 8-second timeout per source.",
      "Feed ranking blends recency with a per-source quality score built from bookmark and read rates.",
      "Postgres full-text search ranked with ts_rank, no external search service.",
      "Timezone-aware digests via Resend, with HMAC-signed unsubscribe and feedback links.",
    ],
  },
  {
    slug: "fieldproof",
    title: "FieldProof",
    tagline: "Field photos in, verifiable impact reports out",
    description:
      "A Python worker tags uploaded photos with CLIP, embeds them for pgvector search, assigns sites from EXIF GPS and estimates before/after green cover. AI-written reports that invent a number are rejected.",
    metric: "40 tests on a real database",
    context: "Code Cubicle 6.0 · team of 4",
    tech: ["FastAPI", "Python", "PostgreSQL", "pgvector", "CLIP", "LiteLLM", "Next.js"],
    image: "/projects/fieldproof.webp",
    liveUrl: "https://cc-hack-pi.vercel.app",
    githubUrl: "https://github.com/MonisMS/cc-hack",
    year: "2026",
    role: "Owned backend, AI pipeline, demo data & deployment",
    highlights: [
      "Postgres-backed job queue feeding a worker that runs CLIP tagging and embeddings via ONNX.",
      "Semantic photo search on pgvector; sites assigned automatically from EXIF GPS.",
      "LLM output containing a literal number is rejected, falling back to the next model, then to a template.",
      "40 pytest tests run against a real database, not mocks.",
    ],
    note: "The live demo serves a saved snapshot of real data while the backend is offline.",
  },
  {
    slug: "datapilot",
    title: "DataPilot",
    tagline: "Prompt in, clean dataset out",
    description:
      "An LLM planning agent turns a prompt into a collection plan, runs robots.txt-aware collectors across 9 sources in parallel, then validates, de-duplicates and confidence-scores the rows into a Postgres dataset.",
    metric: "9 sources in parallel",
    context: "Solo build",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Cheerio", "LLM agents"],
    image: "/projects/datapilot.webp",
    liveUrl: "https://datapilot-intel.vercel.app",
    githubUrl: "https://github.com/MonisMS/cc-general-hack-ps",
    year: "2026",
    role: "Solo",
    highlights: [
      "Planner agent chooses collectors per prompt: job boards, Hacker News, GitHub, Wikipedia, CoinGecko, web search and URL fetch.",
      "Collectors respect robots.txt and run in parallel after the response is sent.",
      "Validator merges duplicates and assigns a confidence score to every row.",
      "Rule-based fallback keeps the pipeline running when every LLM provider fails.",
    ],
  },
  {
    slug: "shikshak-saathi",
    title: "Shikshak Saathi",
    tagline: "A lesson kit from any NCERT chapter",
    description:
      "Turns an NCERT chapter into objectives, a lesson plan, a worksheet and a quiz tagged by misconception, with a validator that auto-repairs malformed AI output, Word export and Hindi voice.",
    metric: "English + Hindi",
    context: "Hack-e-Awadh 2026 · team of 3",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Better Auth", "Gemini", "Sarvam AI"],
    image: "/projects/shikshak.webp",
    liveUrl: "https://shikshak-saathi.vercel.app",
    githubUrl: "https://github.com/MonisMS/shikshak-saathi",
    year: "2026",
    role: "Frontend & AI pipeline",
    highlights: [
      "Generation pipeline produces a full kit per chapter, then a validator repairs malformed output instead of failing.",
      "Quiz questions are tagged by the misconception they test, so results point at what to re-teach.",
      "Word export, Hindi voice via Sarvam AI and a WhatsApp note for parents.",
    ],
  },
];

export const builds: Build[] = [
  {
    title: "Remote Browser Control",
    description:
      "Starts headless Chromium in Docker per session, streams CDP screencast frames over a WebSocket proxy, forwards input and reaps stale containers.",
    tech: ["Node.js", "Docker", "CDP", "WebSockets"],
    githubUrl: "https://github.com/MonisMS/bld-submission",
  },
  {
    title: "Agent Console",
    description:
      "A streaming client that survives bad networks: reorder and de-dupe buffer, a pure state-machine core and resume on reconnect. 60 unit tests.",
    tech: ["TypeScript", "WebSockets", "Vitest"],
    githubUrl: "https://github.com/MonisMS/alcsubmission",
  },
  {
    title: "triage-bot",
    description:
      "A CLI agent that reads a GitHub issue, explores the repo with four capped read-only tools and tells you which files to start with.",
    tech: ["TypeScript", "LLM tools", "Zod"],
    githubUrl: "https://github.com/MonisMS/triage-bot",
  },
  {
    title: "FolderMage",
    description:
      "File organizer with SHA-256 duplicate detection, undo history and scheduled jobs on BullMQ. A Fastify API wrapped in an Electron app.",
    tech: ["Fastify", "BullMQ", "Redis", "Electron"],
    githubUrl: "https://github.com/MonisMS/folder-organizer",
  },
  {
    title: "say-it",
    description:
      "Local push-to-talk dictation for Windows. Whisper runs on your machine, text lands wherever your cursor is, with a Hindi mode.",
    tech: ["Python", "Whisper"],
    githubUrl: "https://github.com/MonisMS/say-it",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
