import { createRoute } from "honox/factory";
import { loadBlogModules, extractSlug } from "../../../lib/blog-loader";
import { RSSFeedGenerator, type RSSFeedItem } from "../../../lib/rss";

export default createRoute(async (c) => {
  const tag = c.req.param("tag");

  if (!tag) {
    return c.notFound();
  }

  const modules = loadBlogModules();
  const baseUrl = new URL(c.req.url).origin;

  const items: (RSSFeedItem | null)[] = Object.entries(modules).map(([id, module]) => {
    const slug = extractSlug(id);

    if (!slug || !module.frontmatter?.title) {
      return null;
    }

    if (!module.frontmatter.tags?.includes(tag)) {
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

  if (validItems.length === 0) {
    return c.notFound();
  }

  const generator = new RSSFeedGenerator({
    title: `KFD Studio Blog - #${tag}`,
    description: `タグ「${tag}」の記事フィード`,
    link: baseUrl,
  });

  const rss = generator.generate(validItems);

  c.header("Content-Type", "application/xml; charset=utf-8");

  return c.body(rss);
});
