import { site } from "@/lib/site/config";
import type { Metadata } from "next";

interface PageMetadataOptions {
  /** Short page title; the layout template adds the name. */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/projects". */
  path: string;
  /** A page-specific 1200×630 card; defaults to the site-wide one. */
  image?: { url: string; alt: string };
}

/**
 * Title, description, canonical URL and social-preview text for one page.
 * Without this, Open Graph and X fields fall back to the homepage's copy.
 * Setting them also drops the inherited preview image, so it's listed here:
 * the site-wide card unless the page passes its own.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${site.shortName}`;
  const preview = {
    url: image?.url ?? "/opengraph-image",
    width: 1200,
    height: 630,
    alt: image?.alt ?? `${site.name}: ${site.role}`,
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [preview],
    },
    twitter: {
      card: "summary_large_image",
      creator: site.xHandle,
      title: fullTitle,
      description,
      images: [preview],
    },
  };
}
