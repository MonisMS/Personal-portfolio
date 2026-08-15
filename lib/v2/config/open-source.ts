import type { Contribution } from "../types";

/**
 * Open-source contributions — real merged PRs authored by github.com/MonisMS,
 * to repositories he doesn't own. Recent first. Each `prUrl` is the verifiable
 * proof; keep this list to genuinely-merged, external work.
 *
 * real-data-or-nothing: an entry ships in production only with a project, a
 * summary AND a merged-PR link. Incomplete entries drop in production and show
 * as TODO chips in development.
 */
export const openSource: Contribution[] = [
  {
    project: "Corsair",
    repoUrl: "https://github.com/corsairdev/corsair",
    summary: "Added an OCR.space integration for extracting text from images.",
    prUrl: "https://github.com/corsairdev/corsair/pull/703",
    prLabel: "#703",
  },
  {
    project: "Hubble",
    repoUrl: "https://github.com/bholmesdev/hubble.md",
    summary:
      "Fixed list items being dropped when pressing Enter after an image.",
    prUrl: "https://github.com/bholmesdev/hubble.md/pull/241",
    prLabel: "#241",
  },
  {
    project: "twitbruv",
    repoUrl: "https://github.com/twitbruv/twitbruv",
    summary: "Handled the @ prefix in search and added an avatar load fallback.",
    prUrl: "https://github.com/twitbruv/twitbruv/pull/113",
    prLabel: "#113",
  },
];
