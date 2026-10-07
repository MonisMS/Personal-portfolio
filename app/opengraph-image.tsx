import { ImageResponse } from "next/og";
import { site } from "@/lib/site/config";
import { fetchContributions, toWeeks } from "@/lib/site/github";
import { OG_COLORS, OG_SIZE, loadOgFonts, ogImage } from "@/lib/site/og";

export const alt = `${site.name}: ${site.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 86400;

/** Same monochrome ramp as the site's graph. */
const LEVEL_OPACITY = [0.07, 0.24, 0.44, 0.68, 0.92];

export default async function Image() {
  const [fonts, avatar, contributions] = await Promise.all([
    loadOgFonts(),
    ogImage("avatar.jpg"),
    fetchContributions(site.githubUsername),
  ]);
  // Real data or nothing: the strip is simply left out if GitHub is down.
  const weeks = contributions ? toWeeks(contributions.days) : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 80px 64px",
          backgroundColor: OG_COLORS.bg,
          color: OG_COLORS.fg,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", paddingTop: 12 }}>
            <div
              style={{
                fontFamily: "Instrument Serif",
                fontSize: 132,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {site.shortName}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 28,
                fontSize: 36,
                lineHeight: 1.35,
                color: OG_COLORS.muted,
              }}
            >
              <span>Full-stack engineer,</span>
              <span>
                building&nbsp;<span style={{ color: OG_COLORS.fg, fontWeight: 500 }}>AI agents</span>
              </span>
            </div>
          </div>

          <img
            src={avatar}
            alt=""
            width={264}
            height={330}
            style={{
              borderRadius: 24,
              border: `1px solid ${OG_COLORS.line}`,
              objectFit: "cover",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {weeks.length > 0 ? (
            <div style={{ display: "flex", gap: 4 }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 2,
                        backgroundColor: day
                          ? `rgba(237,237,237,${LEVEL_OPACITY[day.level]})`
                          : "transparent",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
          <div style={{ fontFamily: "Geist Mono", fontSize: 26, color: OG_COLORS.muted }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
