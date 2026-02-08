import { BLOG_PATH_PATTERN, DATE_LOCALE } from "./constants";

export interface Meta {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  tags?: string[];
  slug?: string;
}

export interface MDXModule {
  frontmatter: Meta;
  default: any;
}

export const loadBlogModules = (): Record<string, MDXModule> => {
  return import.meta.glob<MDXModule>("../routes/blog/posts/*.mdx", {
    eager: true,
  });
};

export const parseDate = (dateStr: string | undefined): Date | null => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

export const formatDate = (dateStr: string | undefined): string => {
  const date = parseDate(dateStr);
  if (!date) return "";
  return date.toLocaleDateString(DATE_LOCALE);
};

export const extractSlug = (id: string): string | null => {
  const match = id.match(BLOG_PATH_PATTERN);
  return match ? match[1] : null;
};

export const findModuleBySlug = (
  modules: Record<string, MDXModule>,
  slug: string | undefined,
): MDXModule | null => {
  if (!slug) return null;

  for (const id in modules) {
    if (extractSlug(id) === slug) {
      return modules[id];
    }
  }

  return null;
};

export const getAllModules = (
  modules: Record<string, MDXModule>,
): Array<{ id: string; module: MDXModule }> => {
  const keys = Object.keys(modules);
  const result: Array<{ id: string; module: MDXModule }> = [];

  for (let i = 0; i < keys.length; i++) {
    const id = keys[i];
    result.push({ id, module: modules[id] });
  }

  return result;
};

export const sortByDate = (
  modules: Record<string, MDXModule> | Array<{ id: string; module: MDXModule }>,
  descending = false,
): Array<{ id: string; module: MDXModule }> => {
  const allModules = Array.isArray(modules) ? modules : getAllModules(modules);
  return allModules.sort((a, b) => {
    const dateA = parseDate(a.module.frontmatter?.pubDate);
    const dateB = parseDate(b.module.frontmatter?.pubDate);

    if (!dateA) return 1;
    if (!dateB) return -1;

    return descending ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
};

export const filterByTag = (
  modules: Record<string, MDXModule> | Array<{ id: string; module: MDXModule }>,
  tag: string,
): Array<{ id: string; module: MDXModule }> => {
  const allModules = Array.isArray(modules) ? modules : getAllModules(modules);
  return allModules.filter(({ module }) => {
    return module.frontmatter?.tags?.includes(tag) ?? false;
  });
};

export const paginate = (
  modules: Array<{ id: string; module: MDXModule }>,
  page: number,
  perPage: number,
): {
  totalItems: number;
  totalPages: number;
  start: number;
  end: number;
  paginatedModules: Array<{ id: string; module: MDXModule }>;
} => {
  const totalItems = modules.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const start = (page - 1) * perPage;
  const end = Math.min(start + perPage, totalItems);
  const paginatedModules = modules.slice(start, end);

  return {
    totalItems,
    totalPages,
    start,
    end,
    paginatedModules,
  };
};
