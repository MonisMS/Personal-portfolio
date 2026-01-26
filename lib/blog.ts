import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  content: string;
  readingTime: number;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  readingTime: number;
}

// Get post metadata only (without MDX processing)
export function getPostMetadata(slug: string): BlogPostMetadata | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      author: data.author,
      image: data.image,
      published: data.published !== false,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post metadata ${slug}:`, error);
    return null;
  }
}

// Get all blog posts metadata
export function getAllPosts(): BlogPostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.md$/, "");
      return getPostMetadata(slug);
    })
    .filter((post): post is BlogPostMetadata => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPosts;
}

// Get a single blog post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      author: data.author,
      image: data.image,
      published: data.published !== false, // Default to true if not specified
      content,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all unique tags
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const allTags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(allTags)).sort();
}

// Get tag with count
export function getTagsWithCount(): Array<{ tag: string; count: number }> {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPostMetadata[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

// Search posts by title or description
export function searchPosts(query: string): BlogPostMetadata[] {
  const posts = getAllPosts();
  const searchQuery = query.toLowerCase();
  
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
  );
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get reading time text
export function getReadingTimeText(minutes: number): string {
  return `${minutes} min read`;
}

// Get featured post (first post or can be marked in frontmatter)
export function getFeaturedPost(): BlogPostMetadata | null {
  const posts = getAllPosts();
  // For now, return the most recent post as featured
  // Later can add a `featured: true` field in frontmatter
  return posts.length > 0 ? posts[0] : null;
}

// Get topic color for visual coding
export function getTopicColor(tag: string): string {
  const colors: Record<string, string> = {
    web3: "from-red-600/30 to-red-800/20",
    blockchain: "from-red-600/30 to-red-800/20",
    "smart-contracts": "from-red-600/30 to-red-800/20",
    ethereum: "from-red-600/30 to-red-800/20",
    altchains: "from-red-600/30 to-red-800/20",
    cryptocurrency: "from-red-600/30 to-red-800/20",
    tutorial: "from-red-600/30 to-red-800/20",
  };
  
  return colors[tag.toLowerCase()] || "from-red-600/30 to-red-800/20";
}