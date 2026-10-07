/** Merged PRs to repositories Monis doesn't own. Recent first. */

export interface PullRequest {
  title: string;
  repo: string;
  number: number;
  /** ISO merge date. */
  mergedAt: string;
  url: string;
}

export const pullRequests: PullRequest[] = [
  {
    title: "Add OCR.space integration",
    repo: "corsairdev/corsair",
    number: 703,
    mergedAt: "2026-08-13",
    url: "https://github.com/corsairdev/corsair/pull/703",
  },
  {
    title: "Keep list items when pressing Enter after an image",
    repo: "bholmesdev/hubble.md",
    number: 241,
    mergedAt: "2026-08-09",
    url: "https://github.com/bholmesdev/hubble.md/pull/241",
  },
  {
    title: "Handle @ prefix in search and add avatar load fallback",
    repo: "twitbruv/twitbruv",
    number: 113,
    mergedAt: "2026-05-02",
    url: "https://github.com/twitbruv/twitbruv/pull/113",
  },
  {
    title: "Only publish the npm package when icon sources change",
    repo: "ig-imanish/mx-icons",
    number: 48,
    mergedAt: "2026-02-21",
    url: "https://github.com/ig-imanish/mx-icons/pull/48",
  },
];
