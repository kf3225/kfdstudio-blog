import { createRoute } from "honox/factory";
import { loadBlogModules, extractSlug } from "../../lib/blog-loader";
import { SearchIndex, type SearchableItem } from "../../lib/search";

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

export interface BlogModuleLoader {
  loadModules(): Record<string, any>;
}

export class DefaultBlogModuleLoader implements BlogModuleLoader {
  loadModules(): Record<string, any> {
    return loadBlogModules();
  }
}

export interface SearchableItemExtractor {
  extract(id: string, module: any): SearchableItem | null;
}

export class DefaultSearchableItemExtractor implements SearchableItemExtractor {
  extract(id: string, module: any): SearchableItem | null {
    if (!module.frontmatter || !module.frontmatter.title) {
      return null;
    }

    const slug = extractSlug(id);
    if (!slug) {
      return null;
    }

    return {
      id,
      slug,
      title: module.frontmatter.title,
      description: module.frontmatter.description || "",
      content: this.extractContent(module),
      pubDate: module.frontmatter.pubDate,
      updatedDate: module.frontmatter.updatedDate,
      tags: module.frontmatter.tags,
    };
  }

  private extractContent(module: any): string {
    const Component = module.default;

    if (!Component) {
      return "";
    }

    if (typeof Component === "function") {
      try {
        const toString = Component.toString();
        const contentMatch = toString.match(/>([\s\S]*?)</);

        if (contentMatch && contentMatch[1]) {
          return contentMatch[1];
        }
      } catch {
        return "";
      }
    }

    return "";
  }
}

export interface SearchService {
  search(request: SearchRequest): SearchResponse;
}

export class BlogSearchService implements SearchService {
  private readonly moduleLoader: BlogModuleLoader;
  private readonly itemExtractor: SearchableItemExtractor;

  constructor(dependencies?: {
    moduleLoader?: BlogModuleLoader;
    itemExtractor?: SearchableItemExtractor;
  }) {
    this.moduleLoader = dependencies?.moduleLoader || new DefaultBlogModuleLoader();
    this.itemExtractor = dependencies?.itemExtractor || new DefaultSearchableItemExtractor();
  }

  search(request: SearchRequest): SearchResponse {
    const { q, limit = 10 } = request;

    if (!q.trim()) {
      return {
        query: "",
        results: [],
        total: 0,
      };
    }

    const searchIndex = new SearchIndex();
    const modules = this.moduleLoader.loadModules();

    for (const [id, module] of Object.entries(modules)) {
      const item = this.itemExtractor.extract(id, module);

      if (item) {
        searchIndex.addItems([item]);
      }
    }

    const results = searchIndex.search(q, limit);

    return {
      query: q,
      results,
      total: results.length,
    };
  }
}

export default createRoute(async (c) => {
  const queryParams = c.req.query();
  const { q, limit } = queryParams;
  const limitNum = limit ? Math.min(parseInt(limit, 10), 50) : 10;

  const searchService = new BlogSearchService();
  const response = searchService.search({ q: q || "", limit: limitNum });

  return c.json(response);
});
