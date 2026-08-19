import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/v2/config/site";

// Rebuild the feed at most hourly.
export const revalidate = 3600;

const BASE = site.url.replace(/\/$/, "");
const AUTHOR = site.name;
const EMAIL = site.email;

/** Wrap free text so stray XML characters can't break the feed. */
const cdata = (value: string) => `<![CDATA[ ${value.replace(/]]>/g, "]]]]><![CDATA[>")} ]]>`;

export async function GET() {
  const posts = getAllPosts();
  const buildDate = (
    posts[0] ? new Date(posts[0].date) : new Date()
  ).toUTCString();
  const year = new Date().getUTCFullYear();

  const items = posts
    .map((post) => {
      const url = `${BASE}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `      <category>${cdata(tag)}</category>`)
        .join("\n");
      return `    <item>
      <title>${cdata(post.title)}</title>
      <description>${cdata(post.description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
${categories}
      <dc:creator>${cdata(post.author)}</dc:creator>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${cdata(`${AUTHOR} · Software Engineer`)}</title>
    <description>${cdata("Backend-focused full-stack engineer. Projects, and writing on web development, AI, and the systems behind them.")}</description>
    <link>${BASE}/</link>
    <generator>RSS for Personal Portfolio</generator>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <pubDate>${buildDate}</pubDate>
    <copyright>${cdata(`Copyright ${year}, ${AUTHOR}`)}</copyright>
    <language>${cdata("en-US")}</language>
    <managingEditor>${cdata(`${EMAIL} (${AUTHOR})`)}</managingEditor>
    <webMaster>${cdata(`${EMAIL} (${AUTHOR})`)}</webMaster>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
