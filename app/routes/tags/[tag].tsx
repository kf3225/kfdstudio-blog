import { createRoute } from "honox/factory";
import { Pagination } from "../../components/Pagination";
import { PostList } from "../../components/PostList";
import {
  filterByTag,
  getAllModules,
  loadBlogModules,
  paginate,
  sortByDate,
} from "../../lib/blog-loader";

export default createRoute((c) => {
  const tag = c.req.param("tag");
  const { page = "1" } = c.req.query();
  const currentPage = parseInt(page, 10) || 1;

  if (!tag) {
    return c.notFound();
  }

  const allModules = getAllModules(loadBlogModules());
  const sortedModules = sortByDate(allModules, true);
  const filteredModules = filterByTag(sortedModules, decodeURIComponent(tag));
  const {
    start: _start,
    end: _end,
    totalPages,
    paginatedModules,
  } = paginate(filteredModules, currentPage, 5);
  const prevHref = currentPage > 1 ? `/tags/${tag}?page=${currentPage - 1}` : undefined;
  const nextHref = currentPage < totalPages ? `/tags/${tag}?page=${currentPage + 1}` : undefined;

  return c.render(
    <div class="container mx-auto px-4 pt-4 pb-8 max-w-6xl">
      <div class="mx-auto w-full max-w-3xl">
        <div class="mb-6">
          <a
            href="/"
            class="inline-block text-gray-500 hover:text-gray-900 transition-colors text-sm"
          >
            ← 記事一覧に戻る
          </a>
          <h1 class="text-3xl font-semibold text-gray-900 mb-3">
            タグ: #{decodeURIComponent(tag)}
          </h1>
          <p class="text-gray-600 mb-4">{filteredModules.length}件の記事</p>
        </div>

        <PostList
          modules={paginatedModules}
          listClassName="space-y-16 min-h-[650px]"
          itemClassName="pb-8 h-[80px]"
          contentClassName=""
          dateClassName="text-xs text-gray-400"
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevHref={prevHref}
          nextHref={nextHref}
          className="flex items-center gap-8 mt-48 justify-center"
        />
      </div>
    </div>,
  );
});
