import { FC } from "hono/jsx";
import { SearchBox } from "./SearchBox";

interface HeaderProps {
  currentPath?: string;
}

export const Header: FC<HeaderProps> = ({ currentPath: _currentPath }) => {
  return (
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50 dark:bg-gray-950 dark:border-gray-800">
      <div class="container mx-auto px-4 py-4 max-w-4xl">
        <div class="relative flex items-center">
          <details id="mobile-filter-menu" class="md:hidden">
            <summary class="list-none cursor-pointer p-2 -ml-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </summary>
            <div class="absolute left-0 right-0 top-full mt-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4 dark:bg-gray-900 dark:border-gray-800">
              <SearchBox className="w-full" />
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-gray-500 dark:text-gray-300">タグフィルタ</span>
                  <a
                    id="mobile-clear-filters"
                    href="/"
                    data-tag-filter-link="true"
                    class="hidden text-xs text-gray-500 hover:text-gray-700 underline dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    全フィルタを解除
                  </a>
                </div>
                <div id="mobile-tag-filter-list" class="flex flex-wrap gap-2"></div>
              </div>
            </div>
          </details>

          <div class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <a
              href="/"
              class="text-2xl font-bold text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
            >
              Dev Blog
            </a>
          </div>
          <SearchBox className="ml-auto hidden md:flex items-center w-60" />
          <button
            id="theme-toggle"
            type="button"
            class="absolute right-0 p-2 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors md:static md:ml-3 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="ダークモードに切り替え"
          >
            <span data-theme-icon aria-hidden="true">
              ☾
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
