import { createRoute } from "honox/factory";
import { findModuleBySlug, formatDate, loadBlogModules } from "../../lib/blog-loader";

export default createRoute(async (c) => {
  const slug = c.req.param("slug");

  const modules = loadBlogModules();
  const module = findModuleBySlug(modules, slug);

  if (!module || !module.frontmatter || !module.frontmatter.title) {
    return c.notFound();
  }

  const pubDate = formatDate(module.frontmatter.pubDate);
  const updatedDate = formatDate(module.frontmatter.updatedDate);

  const Content = module.default;

  return c.render(
    <article class="container mx-auto px-4 py-8 max-w-4xl">
      <a
        href="/"
        class="inline-block mb-6 text-gray-500 hover:text-gray-900 transition-colors text-sm dark:text-gray-400 dark:hover:text-gray-100"
      >
        ← 記事一覧に戻る
      </a>
      <header class="mb-10">
        <h1 class="text-3xl font-semibold text-gray-900 mb-3 dark:text-gray-100">
          {module.frontmatter.title}
        </h1>
        <p class="text-gray-600 mb-4 dark:text-gray-300">{module.frontmatter.description}</p>
        <div class="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <time>{pubDate}</time>
          {updatedDate && (
            <>
              <span>•</span>
              <time>
                更新:
                {updatedDate}
              </time>
            </>
          )}
        </div>
        {module.frontmatter.tags && module.frontmatter.tags.length > 0 && (
          <div class="flex flex-wrap gap-2 mt-4">
            {module.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                class="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs dark:bg-gray-800 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div class="prose prose-gray max-w-none">
        <Content />
      </div>
    </article>,
  );
});
