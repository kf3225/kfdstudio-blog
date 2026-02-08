import { FC } from "hono/jsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  prevHref?: string;
  nextHref?: string;
  className?: string;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  prevHref,
  nextHref,
  className = "flex items-center gap-8 mt-48 justify-center",
}) => {
  return (
    <div class={`w-full ${className}`}>
      <div class="text-sm text-gray-500 flex items-center gap-8">
        {prevHref ? (
          <a
            href={prevHref}
            class="w-20 px-4 py-2 text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            前へ
          </a>
        ) : (
          <span class="w-20 px-4 py-2 text-center text-gray-300 bg-white border border-gray-300 rounded-lg">
            前へ
          </span>
        )}
        <span class="w-20 text-center text-gray-400 tabular-nums">
          {currentPage} / {totalPages}
        </span>
        {nextHref ? (
          <a
            href={nextHref}
            class="w-20 px-4 py-2 text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            次へ
          </a>
        ) : (
          <span class="w-20 px-4 py-2 text-center text-gray-300 bg-white border border-gray-300 rounded-lg">
            次へ
          </span>
        )}
      </div>
    </div>
  );
};
