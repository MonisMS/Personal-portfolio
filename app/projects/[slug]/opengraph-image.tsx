import { ImageResponse } from "next/og";
import { site } from "@/lib/site/config";
import { OG_COLORS, OG_SIZE, loadOgFonts, ogImage } from "@/lib/site/og";
import { getProject, projects } from "@/lib/site/projects";

export const size = OG_SIZE;
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateImageMetadata({ params }: ImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  return [
    {
      id: "card",
      size: OG_SIZE,
      contentType: "image/png",
      alt: project ? `${project.title}: ${project.tagline}` : site.name,
    },
  ];
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  // Screenshots ship as webp for the site; the card uses JPEG copies.
  const shotName = project.image?.split("/").pop()?.replace(/\.webp$/, ".jpg");
  // Long names drop a size so they stay on one line.
  const titleSize = project.title.length > 10 ? 84 : 112;
  const [fonts, avatar, screenshot] = await Promise.all([
    loadOgFonts(),
    ogImage("avatar.jpg"),
    shotName ? ogImage(`projects/${shotName}`) : Promise.resolve(null),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: OG_COLORS.bg,
          color: OG_COLORS.fg,
          fontFamily: "Inter",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 560,
            padding: "80px 0 64px 80px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 14px",
                borderRadius: 8,
                border: `1px solid ${OG_COLORS.line}`,
                fontFamily: "Geist Mono",
                fontSize: 20,
                color: OG_COLORS.muted,
              }}
            >
              {project.metric}
            </div>
            <div
              style={{
                marginTop: 36,
                fontFamily: "Instrument Serif",
                fontSize: titleSize,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                lineHeight: 1.3,
                color: OG_COLORS.muted,
                textWrap: "balance",
              }}
            >
              {project.tagline}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={avatar}
              alt=""
              width={48}
              height={48}
              style={{ borderRadius: 999, objectFit: "cover", objectPosition: "50% 25%" }}
            />
            <div style={{ display: "flex", fontSize: 24, color: OG_COLORS.muted }}>
              <span style={{ color: OG_COLORS.fg }}>{site.shortName}</span>
              <span style={{ margin: "0 12px", color: OG_COLORS.subtle }}>·</span>
              <span style={{ fontFamily: "Geist Mono", fontSize: 22 }}>
                {site.url.replace("https://", "")}
              </span>
            </div>
          </div>
        </div>

        {screenshot && (
          // Bleeds off the right edge, like a window peeking into frame.
          <img
            src={screenshot}
            alt=""
            width={720}
            height={450}
            style={{
              position: "absolute",
              left: 620,
              top: 110,
              borderRadius: 20,
              border: `1px solid ${OG_COLORS.line}`,
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        )}
      </div>
    ),
    { ...size, fonts },
  );
}
