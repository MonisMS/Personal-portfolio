import { Section } from "./section";
import { site } from "@/lib/site/config";
import {
  fetchContributions,
  monthLabels,
  toWeeks,
  type ContributionDay,
  type ContributionLevel,
} from "@/lib/site/github";

/** Monochrome ramp: busier days are brighter. Flips with the theme via --fg. */
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-fg/[0.07]",
  1: "bg-fg/[0.24]",
  2: "bg-fg/[0.44]",
  3: "bg-fg/[0.68]",
  4: "bg-fg/[0.92]",
};

function describe(day: ContributionDay): string {
  const date = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (day.count === 0) return `No contributions on ${date}`;
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

/** Real contribution calendar; renders nothing if the data can't be fetched. */
export async function GithubActivity() {
  const data = await fetchContributions(site.githubUsername);
  if (!data) return null;

  const weeks = toWeeks(data.days);
  const months = monthLabels(weeks);

  return (
    <Section id="activity" title="Activity">
      <div className="mb-4 flex items-baseline justify-between gap-4 text-sm">
        <p className="text-muted">
          <span className="text-fg tabular-nums">
            {data.total.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </p>
        <a
          href={`https://github.com/${site.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-subtle hover:text-fg font-mono text-xs transition-colors duration-150"
        >
          @{site.githubUsername}
        </a>
      </div>

      {/* Scrolls on narrow screens; most recent weeks stay in view. */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1 [direction:rtl]">
        <div className="inline-flex flex-col gap-[2px] [direction:ltr]">
          <div aria-hidden className="text-subtle flex h-3 gap-[2px] text-[10px] leading-none">
            {months.map((month, i) => (
              <span key={i} className="w-[10px] whitespace-nowrap">
                {month}
              </span>
            ))}
          </div>
          <div className="flex gap-[2px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day, di) =>
                  day ? (
                    <span
                      key={di}
                      title={describe(day)}
                      className={`size-[10px] rounded-[2px] ${LEVEL_CLASS[day.level]}`}
                    />
                  ) : (
                    <span key={di} className="size-[10px]" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
