export const buildTagFilterHref = (tags: string[]): string => {
  if (tags.length === 0) {
    return "/";
  }

  const params = tags.map((tag) => `tag=${encodeURIComponent(tag)}`).join("&");
  return `/?${params}`;
};
