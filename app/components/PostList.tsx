import { FC } from "hono/jsx";
import { extractSlug, formatDate, MDXModule } from "../lib/blog-loader";

interface PostListProps {
  modules: Array<{ id: string; module: MDXModule }>;
  showTags?: boolean;
  selectedTags?: string[];
  listClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  dateClassName?: string;
}

const buildTagFilterHref = (tags: string[]): string => {
  if (tags.length === 0) {
    return "/";
  }

  const params = tags.map((tag) => `tag=${encodeURIComponent(tag)}`).join("&");
  return `/?${params}`;
};

export const PostList: FC<PostListProps> = ({
  modules,
  showTags = false,
  selectedTags = [],
  listClassName = "space-y-16",
  itemClassName = "pb-8 h-[100px]",
  contentClassName = "flex flex-col",
  dateClassName = "text-xs text-gray-400 mb-2",
}) => {
  return (
    <div class={listClassName}>
      {modules.map(({ id, module }) => {
        if (!module.frontmatter) {
          return null;
        }

        const slug = extractSlug(id);
        if (!slug) {
          return null;
        }

        const pubDate = formatDate(module.frontmatter.pubDate);

        return (
          <article class={itemClassName}>
            <a
              href={`/blog/${slug}`}
              class="block hover:text-gray-900 transition-colors text-gray-700 h-full flex flex-col"
            >
              <div class={contentClassName}>
                <h2 class="text-xl font-semibold mb-2 line-clamp-1">{module.frontmatter.title}</h2>
                <div class={dateClassName}>
                  <time>{pubDate}</time>
                </div>
                {showTags && module.frontmatter.tags && module.frontmatter.tags.length > 0 && (
                  <div class="flex flex-wrap gap-2">
                    {module.frontmatter.tags.map((tag) => (
                      <a
                        key={tag}
                        href={buildTagFilterHref(
                          selectedTags.includes(tag) ? selectedTags : [...selectedTags, tag],
                        )}
                        class="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </a>
          </article>
        );
      })}
    </div>
  );
};
