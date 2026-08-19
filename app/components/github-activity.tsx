"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";

/**
 * GitHub contribution graph — deliberately subtle. A monochrome ramp (NOT the
 * usual GitHub green), no color legend, no weekday labels. The only text is the
 * total, kept small in the corner below the grid. Real data via the same public
 * aggregator the v2 heatmap uses; renders a quiet loading state, then the grid.
 */

// Density light → dark on the light theme; dark → light on dark. Grayscale only.
const THEME = {
  light: ["#ebebeb", "#cfcfcf", "#a1a1a1", "#6b6b6b", "#333333"],
  dark: ["#1e1e1e", "#3a3a3a", "#5f5f5f", "#8f8f8f", "#cfcfcf"],
};

export function GithubActivity() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a theme flash: only render once we know the resolved color scheme.
  useEffect(() => setMounted(true), []);

  return (
    <section id="activity" className="bg-bg-primary px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-x-auto text-text-muted">
          {mounted && (
            <GitHubCalendar
              username="MonisMS"
              year="last"
              colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
              theme={THEME}
              blockSize={13}
              blockMargin={3}
              blockRadius={2}
              fontSize={12}
              showColorLegend={false}
              showWeekdayLabels={false}
              labels={{ totalCount: "{{count}} contributions in the last year" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
