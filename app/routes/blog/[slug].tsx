import { createRoute } from "honox/factory";
import type { Meta } from "../../lib/types";

export default createRoute(async (c) => {
  const slug = c.req.param("slug");

  // @ts-ignore
  const modules = import.meta.glob<{ frontmatter: Meta; default: any }>("./posts/*.mdx", {
    eager: true,
  });

  const matchedPath = Object.keys(modules).find((path) => path.endsWith(`${slug}.mdx`));

  if (!matchedPath) {
    return c.notFound();
  }

  const module = modules[matchedPath];

  if (!module.frontmatter || !module.frontmatter.title) {
    return c.notFound();
  }

  // MDXコンポーネントをレンダリング
  const Content = module.default;

  return c.render(
    <article class="container mx-auto px-4 py-8 max-w-3xl">
      <a href="/" class="inline-block mb-6 text-blue-600 hover:text-blue-700 transition-colors">
        ← 記事一覧に戻る
      </a>
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">{module.frontmatter.title}</h1>
        <p class="text-gray-600 text-lg mb-4">{module.frontmatter.description}</p>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <time>{new Date(module.frontmatter.pubDate).toLocaleDateString("ja-JP")}</time>
          {module.frontmatter.updatedDate && (
            <>
              <span>•</span>
              <time>
                更新:
                {new Date(module.frontmatter.updatedDate).toLocaleDateString("ja-JP")}
              </time>
            </>
          )}
        </div>
        {module.frontmatter.tags && module.frontmatter.tags.length > 0 && (
          <div class="flex flex-wrap gap-2 mt-4">
            {module.frontmatter.tags.map((tag) => (
              <span key={tag} class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div class="prose prose-blue max-w-none">
        <Content />
      </div>
    </article>,
  );
});
