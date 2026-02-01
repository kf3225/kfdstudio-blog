import type { Meta } from "../lib/types";

// @ts-ignore
export default function BlogIndex() {
  const modules = import.meta.glob<{ frontmatter: Meta }>("./blog/posts/*.mdx", {
    eager: true,
  });

  return (
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <h1 class="text-3xl font-semibold text-gray-900 mb-8">ブログ</h1>
      <div class="space-y-12">
        {Object.entries(modules).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <article class="pb-8">
                <a
                  href={`/blog/${id.match(/(\d{4}-\d{2}-\d{2}-[\w-]+)\.mdx$/)?.[1]}`}
                  class="block hover:text-gray-900 transition-colors text-gray-700"
                >
                  <h2 class="text-xl font-semibold mb-2">{module.frontmatter.title}</h2>
                  <p class="text-gray-500 mb-3">{module.frontmatter.description}</p>
                  <div class="text-xs text-gray-400">
                    <time>{new Date(module.frontmatter.pubDate).toLocaleDateString("ja-JP")}</time>
                  </div>
                </a>
              </article>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
