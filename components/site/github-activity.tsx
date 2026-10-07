import { RevealOnView } from "./reveal-on-view";
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
    <Section
      id="activity"
      title="Activity"
      action={{
        label: `@${site.githubUsername}`,
        href: `https://github.com/${site.githubUsername}`,
      }}
    >
      {/* Scrolls on narrow screens; most recent weeks stay in view. */}
      <div
        tabIndex={0}
        role="img"
        aria-label={`GitHub contribution graph for ${site.githubUsername} over the last 12 months`}
        className="-mx-1 overflow-x-auto rounded-sm px-1 pb-1 [direction:rtl]"
      >
        <RevealOnView className="inline-flex flex-col gap-[0.125rem] [direction:ltr]">
          <div className="text-subtle flex h-3 gap-[0.125rem] text-[0.625rem] leading-none">
            {months.map((month, i) => (
              <span key={i} className="w-[0.625rem] whitespace-nowrap">
                {month}
              </span>
            ))}
          </div>
          <div className="flex gap-[0.125rem]">
            {weeks.map((week, wi) => (
              <div
                key={wi}
                className="heat-col flex flex-col gap-[0.125rem]"
                style={{ "--c": wi } as React.CSSProperties}
              >
                {week.map((day, di) =>
                  day ? (
                    <span
                      key={di}
                      title={describe(day)}
                      className={`size-[0.625rem] rounded-[0.125rem] ${LEVEL_CLASS[day.level]}`}
                    />
                  ) : (
                    <span key={di} className="size-[0.625rem]" />
                  ),
                )}
              </div>
            ))}
          </div>
        </RevealOnView>
      </div>
    </Section>
  );
}
