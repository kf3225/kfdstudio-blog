import { BLOG_PATH_PATTERN, DATE_LOCALE } from "./constants";
import type { MDXModule } from "./types";

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
  slug: string,
): MDXModule | null => {
  const matchedPath = Object.keys(modules).find((path) => path.endsWith(`${slug}.mdx`));
  if (!matchedPath) {
    return null;
  }
  return modules[matchedPath];
};
