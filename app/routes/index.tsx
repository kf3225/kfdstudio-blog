import { createRoute } from "honox/factory";
import { Pagination } from "../components/Pagination";
import { PostList } from "../components/PostList";
import { TagFilterList } from "../components/TagFilter";
import { loadBlogModules, paginate, sortByDate } from "../lib/blog-loader";

export default createRoute((c) => {
  const modules = loadBlogModules();
  const { page = "1" } = c.req.query();
  const selectedTags = [...new Set(new URL(c.req.url).searchParams.getAll("tag").filter(Boolean))];
  const currentPage = parseInt(page, 10) || 1;

  let sortedModules = sortByDate(modules, true);
  if (selectedTags.length > 0) {
    sortedModules = sortedModules.filter(({ module }) =>
      selectedTags.every((tag) => module.frontmatter?.tags?.includes(tag)),
    );
  }

  const allTags = Object.values(modules)
    .flatMap((module) => module.frontmatter?.tags || [])
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const sortedTags = Object.entries(allTags)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);

  const {
    start: _start,
    end: _end,
    totalPages,
    paginatedModules,
  } = paginate(sortedModules, currentPage, 5);
  const querySuffix =
    selectedTags.length > 0
      ? `&${selectedTags.map((tag) => `tag=${encodeURIComponent(tag)}`).join("&")}`
      : "";
  const prevHref = currentPage > 1 ? `/?page=${currentPage - 1}${querySuffix}` : undefined;
  const nextHref = currentPage < totalPages ? `/?page=${currentPage + 1}${querySuffix}` : undefined;

  return c.render(
    <div class="container mx-auto px-4 pt-4 pb-8 max-w-4xl">
      <div class="flex items-start justify-between pt-8 gap-20">
        <div id="post-list-container">
          <PostList
            modules={paginatedModules}
            showTags={true}
            selectedTags={selectedTags}
            emptyMessage={
              selectedTags.length > 0
                ? "フィルタ条件に一致する記事が見つかりませんでした。"
                : "表示できる記事がありません。"
            }
            listClassName="space-y-8 min-h-[750px]"
            itemClassName="min-h-[100px]"
            contentClassName="flex flex-col"
            dateClassName="text-xs text-gray-400 mb-2 dark:text-gray-500"
          />
        </div>

        <TagFilterList
          tags={sortedTags}
          selectedTags={selectedTags}
          containerId="desktop-tag-filter"
          containerClassName="hidden md:block w-56 shrink-0"
          contentClassName="sticky top-20"
        />
      </div>
      <div id="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevHref={prevHref}
          nextHref={nextHref}
          className="flex items-center md:mt-48 justify-center"
        />
      </div>
    </div>,
  );
});
