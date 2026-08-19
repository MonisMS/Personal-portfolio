import { openSource } from "./open-source";
import { featuredProjects } from "./projects";

/**
 * Honest, verifiable metrics — no vanity numbers. Two are derived from config
 * so they can never drift from what the site actually shows: `featuredProjects`
 * is the exact set of cards below, `openSource` is the list of merged PRs (each
 * one linked and merge-verified). The Curio figure traces to its own case study.
 *
 * If a number here can't be clicked through to and confirmed, it doesn't belong.
 */
export const stats = [
  { value: String(featuredProjects.length), label: "Featured projects shipped" },
  { value: String(openSource.length), label: "Merged open-source PRs" },
  { value: "60+", label: "RSS sources aggregated in Curio" },
] as const;
