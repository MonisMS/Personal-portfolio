import type { NextConfig } from "next";

// Projects that existed under /v2 but have no case study any more.
const RETIRED_V2_PROJECTS = ["nivora", "foldermage", "askai", "pharmaguard"];

const nextConfig: NextConfig = {
  // Include metadata in the initial head even for unrecognized link-preview bots.
  htmlLimitedBots: /.*/,
  // Project OG images read fonts and photos from disk; ship them with those routes.
  outputFileTracingIncludes: {
    "/projects/[slug]/opengraph-image/[__metadata_id__]": ["./assets/og/**/*"],
  },
  // The old /v2 preview was public; keep its links working.
  async redirects() {
    return [
      // Keep images in previously cached social previews working.
      { source: "/opengraph-image", destination: "/opengraph-image.png", permanent: true },
      ...RETIRED_V2_PROJECTS.map((slug) => ({
        source: `/v2/projects/${slug}`,
        destination: "/projects",
        permanent: true,
      })),
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
