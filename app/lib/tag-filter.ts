import type { MDXModule } from "./blog-loader";

export const TAG_FILTER_ACTIVE_CLASS =
  "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
export const TAG_FILTER_INACTIVE_CLASS =
  "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

export interface BlogModuleEntry {
  id: string;
  module: MDXModule;
}

export type TagMatchStrategy = (
  postTags: readonly string[],
  selectedTags: readonly string[],
) => boolean;

// デフォルトは「選択したタグをすべて含む記事のみ表示」。
// 仕様変更時はこの戦略関数を差し替えるだけで拡張できる。
export const matchAllSelectedTags: TagMatchStrategy = (postTags, selectedTags) => {
  return selectedTags.every((tag) => postTags.includes(tag));
};

export const normalizeSelectedTags = (tags: readonly string[]): string[] => {
  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
};

export const getSelectedTagsFromSearchParams = (searchParams: URLSearchParams): string[] => {
  return normalizeSelectedTags(searchParams.getAll("tag"));
};

export const getSelectedTagsFromUrl = (url: string): string[] => {
  const normalizedUrl = /^https?:\/\//.test(url) ? url : `http://localhost${url}`;
  return getSelectedTagsFromSearchParams(new URL(normalizedUrl).searchParams);
};

export const toggleTagSelection = (selectedTags: readonly string[], tag: string): string[] => {
  return selectedTags.includes(tag)
    ? selectedTags.filter((selectedTag) => selectedTag !== tag)
    : [...selectedTags, tag];
};

export const filterModulesBySelectedTags = (
  modules: BlogModuleEntry[],
  selectedTags: readonly string[],
  matcher: TagMatchStrategy = matchAllSelectedTags,
): BlogModuleEntry[] => {
  if (selectedTags.length === 0) {
    return modules;
  }

  return modules.filter(({ module }) => {
    const postTags = module.frontmatter?.tags ?? [];
    return matcher(postTags, selectedTags);
  });
};

export const getSortedTagsFromModules = (modules: Record<string, MDXModule>): string[] => {
  const allTags = Object.values(modules)
    .flatMap((module) => module.frontmatter?.tags || [])
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  return Object.entries(allTags)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);
};

const buildTagQueryString = (tags: readonly string[]): string => {
  if (tags.length === 0) {
    return "";
  }

  const params = tags.map((tag) => `tag=${encodeURIComponent(tag)}`).join("&");
  return params;
};

export const buildTagQuerySuffix = (tags: readonly string[]): string => {
  // pageクエリと連結しやすいように先頭を "&" で返す。
  const query = buildTagQueryString(tags);
  return query ? `&${query}` : "";
};

export const buildTagFilterHref = (tags: readonly string[]): string => {
  const query = buildTagQueryString(tags);
  return query ? `/?${query}` : "/";
};
