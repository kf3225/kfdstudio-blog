import { createRoute } from "honox/factory";
import { loadBlogModules, extractSlug } from "../../lib/blog-loader";
import { createSearchIndex, addItems, searchIndex, type SearchableItem } from "../../lib/search";

export interface SearchRequest {
  q: string;
  limit?: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResultItem[];
  total: number;
}

export interface SearchResultItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags?: string[];
  score: number;
}

const extractSearchableItem = (id: string, module: any): SearchableItem | null => {
  if (!module.frontmatter || !module.frontmatter.title) {
    return null;
  }

  const slug = extractSlug(id);
  if (!slug) {
    return null;
  }

  const Component = module.default;

  let content = "";

  if (Component) {
    if (typeof Component === "function") {
      try {
        const toString = Component.toString();
        const contentMatch = toString.match(/>([\s\S]*?)</);

        if (contentMatch && contentMatch[1]) {
          content = contentMatch[1];
        }
      } catch {
        content = "";
      }
    }
  }

  return {
    id,
    slug,
    title: module.frontmatter.title,
    description: module.frontmatter.description || "",
    content,
    pubDate: module.frontmatter.pubDate,
    updatedDate: module.frontmatter.updatedDate,
    tags: module.frontmatter.tags,
  };
};

export default createRoute(async (c) => {
  const queryParams = c.req.query();
  const { q, limit } = queryParams;
  const limitNum = limit ? Math.min(parseInt(limit, 10), 50) : 10;

  const { q: query, limit: queryLimit } = { q: q || "", limit: limitNum };

  if (!query.trim()) {
    return c.json({
      query: "",
      results: [],
      total: 0,
    });
  }

  const searchIndexObj = createSearchIndex();
  const modules = loadBlogModules();

  for (const [id, module] of Object.entries(modules)) {
    const item = extractSearchableItem(id, module);

    if (item) {
      const updatedIndex = addItems(searchIndexObj, [item]);
      Object.assign(searchIndexObj, updatedIndex);
    }
  }

  const results = searchIndex(searchIndexObj, query, queryLimit);

  return c.json({
    query,
    results,
    total: results.length,
  });
});
