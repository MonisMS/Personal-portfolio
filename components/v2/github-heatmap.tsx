import { Section } from "@/components/v2/section";
import { site } from "@/lib/v2/config/site";
import {
  fetchContributions,
  monthLabels,
  toWeeks,
  type ContributionDay,
  type ContributionLevel,
} from "@/lib/v2/github";

/**
 * Monochrome sequential ramp — denser day = brighter cell. NOT GitHub green:
 * the palette here is a scalpel (see DESIGN.md §3), so contribution density
 * reads as light→bright on the near-black canvas. Works inverted in light mode
 * because `--foreground` flips with the theme.
 */
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-foreground/[0.06]",
  1: "bg-foreground/[0.22]",
  2: "bg-foreground/[0.42]",
  3: "bg-foreground/[0.66]",
  4: "bg-foreground/[0.92]",
};

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

function label(day: ContributionDay): string {
  const date = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const noun = day.count === 1 ? "contribution" : "contributions";
  return day.count === 0
    ? `No contributions on ${date}`
    : `${day.count} ${noun} on ${date}`;
}

/**
 * Real GitHub contribution calendar. Async server component: it fetches on the
 * server, and if the data isn't there it renders nothing (real-data-or-nothing).
 */
export async function GithubHeatmap() {
  const data = await fetchContributions(site.githubUsername);
  if (!data) return null;

  const weeks = toWeeks(data.days);
  const months = monthLabels(weeks);
  const profileUrl = `https://github.com/${site.githubUsername}`;

  return (
    <Section id="activity">
      <div className="v2-rise">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-foreground font-display text-[1.75rem] leading-none tracking-tight">
            Activity
          </h2>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground shrink-0 text-sm transition-colors"
          >
            @{site.githubUsername}
          </a>
        </div>

        <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed">
          <span className="text-foreground font-medium">
            {data.total.toLocaleString()}
          </span>{" "}
          contributions in the last year.
        </p>

        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-max gap-[3px]">
            {/* Weekday gutter — top spacer keeps it aligned with the month row. */}
            <div
              aria-hidden
              className="text-muted-foreground/70 mr-1 flex flex-col gap-[3px] pt-[15px] text-[9px] leading-none"
            >
              {WEEKDAYS.map((d, i) => (
                <span key={i} className="flex h-[11px] items-center">
                  {d}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-[3px]">
              {/* Month labels: one per column that starts a new month. */}
              <div
                aria-hidden
                className="text-muted-foreground/70 flex h-3 gap-[3px] text-[9px] leading-none"
              >
                {months.map((m, i) => (
                  <span key={i} className="w-[11px] whitespace-nowrap">
                    {m}
                  </span>
                ))}
              </div>

              {/* The grid: one flex column per week, seven cells Sun→Sat. */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) =>
                      day ? (
                        <span
                          key={di}
                          title={label(day)}
                          aria-label={label(day)}
                          className={`size-[11px] rounded-[2px] ${LEVEL_CLASS[day.level]}`}
                        />
                      ) : (
                        <span key={di} className="size-[11px]" />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ramp legend — the sequential scale, so density is never color-alone. */}
        <div className="text-muted-foreground/70 mt-3 flex items-center justify-end gap-1.5 text-[11px]">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as ContributionLevel[]).map((l) => (
            <span
              key={l}
              className={`size-[11px] rounded-[2px] ${LEVEL_CLASS[l]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </Section>
  );
}
