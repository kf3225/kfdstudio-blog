import { createRoute } from "honox/factory";
import { Pagination } from "../components/Pagination";
import { PostList } from "../components/PostList";
import { TagFilterList } from "../components/TagFilter";
import { loadBlogModules, paginate, sortByDate } from "../lib/blog-loader";
import {
  buildTagQuerySuffix,
  filterModulesBySelectedTags,
  getSelectedTagsFromUrl,
  getSortedTagsFromModules,
} from "../lib/tag-filter";

export default createRoute((c) => {
  const modules = loadBlogModules();
  const { page = "1" } = c.req.query();
  const selectedTags = getSelectedTagsFromUrl(c.req.url);
  const currentPage = parseInt(page, 10) || 1;

  const sortedModules = filterModulesBySelectedTags(sortByDate(modules, true), selectedTags);
  const sortedTags = getSortedTagsFromModules(modules);

  const {
    start: _start,
    end: _end,
    totalPages,
    paginatedModules,
  } = paginate(sortedModules, currentPage, 5);
  const querySuffix = buildTagQuerySuffix(selectedTags);
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
