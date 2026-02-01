import type { Meta } from "../lib/types";

// @ts-ignore
export default function BlogIndex() {
  const modules = import.meta.glob<{ frontmatter: Meta }>("./blog/posts/*.mdx", {
    eager: true,
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-blue-600 mb-8">ブログ</h1>
      <div class="space-y-8">
        {Object.entries(modules).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <article class="border-b pb-8">
                <a
                  href={`${id.replace(/\.mdx$/, "")}`}
                  class="block hover:text-blue-600 transition-colors"
                >
                  <h2 class="text-2xl font-bold mb-2">{module.frontmatter.title}</h2>
                  <p class="text-gray-600 mb-4">{module.frontmatter.description}</p>
                  <div class="text-sm text-gray-500">
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
