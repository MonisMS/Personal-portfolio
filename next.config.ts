import type { NextConfig } from "next";

// Projects that existed under /v2 but have no case study any more.
const RETIRED_V2_PROJECTS = ["nivora", "foldermage", "askai", "pharmaguard"];

const nextConfig: NextConfig = {
  // The old /v2 preview was public; keep its links working.
  async redirects() {
    return [
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
