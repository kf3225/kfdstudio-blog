import { createRoute } from "honox/factory";
import { loadBlogModules } from "../../lib/blog-loader";

export default createRoute((c) => {
  const modules = loadBlogModules();
  const allTags = Object.values(modules)
    .flatMap((module) => module.frontmatter?.tags || [])
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const tags = Object.entries(allTags)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);

  return c.json({ tags });
});
