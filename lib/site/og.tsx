import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared pieces for the generated Open Graph images (1200×630).
 * Same palette and fonts as the site: near-black, white, grays.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  bg: "#0a0a0a",
  fg: "#ededed",
  muted: "#a3a3a3",
  subtle: "#737373",
  line: "rgba(255,255,255,0.10)",
};

const ASSETS = join(process.cwd(), "assets/og");

/** Fonts Satori can read (woff, not woff2). */
export async function loadOgFonts() {
  const [serif, inter, interMedium, mono] = await Promise.all([
    readFile(join(ASSETS, "instrument-serif-latin-400-normal.woff")),
    readFile(join(ASSETS, "inter-latin-400-normal.woff")),
    readFile(join(ASSETS, "inter-latin-500-normal.woff")),
    readFile(join(ASSETS, "geist-mono-latin-400-normal.woff")),
  ]);

  return [
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: interMedium, weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/** A JPEG from assets/og as a data URL (Satori can't read webp). */
export async function ogImage(relativePath: string) {
  const data = await readFile(join(ASSETS, relativePath));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}
