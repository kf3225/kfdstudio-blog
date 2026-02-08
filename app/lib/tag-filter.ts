export const TAG_FILTER_ACTIVE_CLASS =
  "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
export const TAG_FILTER_INACTIVE_CLASS =
  "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

export const buildTagFilterHref = (tags: string[]): string => {
  if (tags.length === 0) {
    return "/";
  }

  const params = tags.map((tag) => `tag=${encodeURIComponent(tag)}`).join("&");
  return `/?${params}`;
};
