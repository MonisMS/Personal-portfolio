import type { MetadataRoute } from "next";
import { site } from "@/lib/site/config";

export default function robots(): MetadataRoute.Robots {
  return {
    // /v2 is the abandoned redesign (delete app/v2, then drop this rule).
    rules: { userAgent: "*", allow: "/", disallow: ["/v2"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
