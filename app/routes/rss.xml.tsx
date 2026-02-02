import { createRoute } from "honox/factory";
import { loadBlogModules, extractSlug } from "../lib/blog-loader";
import { RSSFeedGenerator, type RSSFeedItem } from "../lib/rss";

export default createRoute(async (c) => {
  const modules = loadBlogModules();
  const baseUrl = new URL(c.req.url).origin;

  const items: (RSSFeedItem | null)[] = Object.entries(modules).map(([id, module]) => {
    const slug = extractSlug(id);

    if (!slug || !module.frontmatter?.title) {
      return null;
    }

    return {
      title: module.frontmatter.title,
      description: module.frontmatter.description || "",
      link: `${baseUrl}/blog/${slug}`,
      pubDate: new Date(module.frontmatter.pubDate).toISOString(),
      updatedDate: module.frontmatter.updatedDate
        ? new Date(module.frontmatter.updatedDate).toISOString()
        : undefined,
      tags: module.frontmatter.tags,
    };
  });

  const validItems: RSSFeedItem[] = items.filter((item): item is RSSFeedItem => item !== null)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const generator = new RSSFeedGenerator({
    title: "KFD Studio Blog",
    description: "技術的な記事や開発日記を投稿しています。",
    link: baseUrl,
  });

  const rss = generator.generate(validItems);

  c.header("Content-Type", "application/xml; charset=utf-8");

  return c.body(rss);
});
