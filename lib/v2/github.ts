/**
 * Real GitHub contribution data for the hero heatmap.
 *
 * GitHub's own contribution calendar lives only in the GraphQL API
 * (`contributionsCollection`), which requires an auth token. To keep the widget
 * zero-config and buildable without secrets, we read from a public aggregator
 * that mirrors the same public calendar. It returns real counts for a real
 * account — no fabrication.
 *
 * Swap path (when a token exists): replace `fetchContributions` with a GraphQL
 * call to `api.github.com/graphql` using `GITHUB_TOKEN`. Nothing else changes —
 * the component only ever sees `ContributionData | null`.
 *
 * Contract: on ANY failure (network, non-200, empty, malformed) this returns
 * `null`, and the widget renders nothing. A fake grid must never ship.
 */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** ISO date, e.g. "2026-08-15". */
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface ContributionData {
  /** Total contributions across the returned window. */
  total: number;
  days: ContributionDay[];
}

/** One column of the calendar: 7 slots, Sun→Sat. `null` = padding day. */
export type ContributionWeek = (ContributionDay | null)[];

const ENDPOINT = "https://github-contributions-api.jogruber.de/v4";

function clampLevel(value: unknown): ContributionLevel {
  const n = typeof value === "number" ? value : 0;
  if (n <= 0) return 0;
  if (n >= 4) return 4;
  return n as ContributionLevel;
}

export async function fetchContributions(
  username: string,
): Promise<ContributionData | null> {
  try {
    const res = await fetch(`${ENDPOINT}/${username}?y=last`, {
      // Revalidate hourly — contribution counts move slowly and we never want
      // to hammer the aggregator on every request.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const json: unknown = await res.json();
    const raw =
      json && typeof json === "object" && "contributions" in json
        ? (json as { contributions?: unknown }).contributions
        : null;
    if (!Array.isArray(raw) || raw.length === 0) return null;

    const days: ContributionDay[] = raw
      .filter(
        (d): d is { date: string; count: number; level?: number } =>
          !!d &&
          typeof d === "object" &&
          typeof (d as { date?: unknown }).date === "string" &&
          typeof (d as { count?: unknown }).count === "number",
      )
      .map((d) => ({
        date: d.date,
        count: d.count,
        level: clampLevel(d.level),
      }));
    if (days.length === 0) return null;

    const lastYear =
      json && typeof json === "object" && "total" in json
        ? (json as { total?: { lastYear?: unknown } }).total?.lastYear
        : undefined;
    const total =
      typeof lastYear === "number"
        ? lastYear
        : days.reduce((sum, d) => sum + d.count, 0);

    return { total, days };
  } catch {
    return null;
  }
}

/**
 * Groups a flat, date-ordered day list into GitHub-style columns (weeks),
 * padded so every column is a full Sun→Sat run. Keeps the grid aligned even
 * when the window starts or ends mid-week.
 */
export function toWeeks(days: ContributionDay[]): ContributionWeek[] {
  if (days.length === 0) return [];

  const weeks: ContributionWeek[] = [];
  let current: ContributionWeek = [];

  // Pad the first column so day 0 lands on its real weekday.
  const firstWeekday = new Date(`${days[0].date}T00:00:00`).getUTCDay();
  for (let i = 0; i < firstWeekday; i++) current.push(null);

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }

  return weeks;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * A month label per column, shown only when the column begins a new month
 * (matches GitHub's sparse month row). Empty string = no label for that column.
 */
export function monthLabels(weeks: ContributionWeek[]): string[] {
  let previous = -1;
  return weeks.map((week) => {
    const first = week.find((d): d is ContributionDay => d !== null);
    if (!first) return "";
    const month = new Date(`${first.date}T00:00:00`).getUTCMonth();
    if (month === previous) return "";
    previous = month;
    return MONTHS[month];
  });
}
