import { loadBlogModules, formatDate, extractSlug } from "../lib/blog-loader";

export default function BlogIndex() {
  const modules = loadBlogModules();

  return (
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <h1 class="text-3xl font-semibold text-gray-900 mb-8">ブログ</h1>
      <div class="space-y-12">
        {Object.entries(modules).map(([id, module]) => {
          if (!module.frontmatter) {
            return null;
          }

          const slug = extractSlug(id);
          if (!slug) {
            return null;
          }

          const pubDate = formatDate(module.frontmatter.pubDate);

          return (
            <article class="pb-8">
              <a
                href={`/blog/${slug}`}
                class="block hover:text-gray-900 transition-colors text-gray-700"
              >
                <h2 class="text-xl font-semibold mb-2">{module.frontmatter.title}</h2>
                <p class="text-gray-500 mb-3">{module.frontmatter.description}</p>
                <div class="text-xs text-gray-400">
                  <time>{pubDate}</time>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
