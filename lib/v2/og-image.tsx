import { ImageResponse } from "next/og";

import { site } from "@/lib/v2/config/site";
import { hero } from "@/lib/v2/config/hero";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${site.name} — ${hero.tagline}`;
export const OG_CONTENT_TYPE = "image/png";

/**
 * Loads a single Google font as a TTF for use inside satori (next/og). Returns
 * null on any failure so the image still renders — just in the default sans.
 */
async function loadFont(
  family: string,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(
      text,
    )}`;
    const css = await (await fetch(url)).text();
    const src = css.match(
      /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!src) return null;
    return await (await fetch(src[1])).arrayBuffer();
  } catch {
    return null;
  }
}

/**
 * The v2 share card: editorial serif name on near-black, with the terminal
 * `$whoami` mark, the open-to-work status, and the tagline. Used for both the
 * OpenGraph and Twitter images so they stay identical.
 */
export async function renderOgImage() {
  const domain = new URL(site.url).host.replace(/^www\./, "");
  const serif = await loadFont("Instrument+Serif", site.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          <span style={{ color: "#71717a" }}>$&nbsp;</span>
          <span>whoami</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 28,
              fontSize: 26,
              color: "#a1a1aa",
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 99,
                backgroundColor: "#22c55e",
                marginRight: 14,
              }}
            />
            <span>{hero.openToWork.label}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 108,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontFamily: serif ? "Instrument Serif" : undefined,
            }}
          >
            {site.name}
          </div>

          <div style={{ display: "flex", marginTop: 26, fontSize: 36, color: "#a1a1aa" }}>
            {hero.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#71717a",
          }}
        >
          <span>{domain}</span>
          <span>github.com/{site.githubUsername}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: serif
        ? [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }]
        : [],
    },
  );
}
