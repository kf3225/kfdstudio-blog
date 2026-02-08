import { FC } from "hono/jsx";
import { SearchBox } from "./SearchBox";

interface HeaderProps {
  currentPath?: string;
}

export const Header: FC<HeaderProps> = ({ currentPath: _currentPath }) => {
  return (
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 max-w-4xl">
        <div class="relative flex items-center">
          <details id="mobile-filter-menu" class="md:hidden">
            <summary class="list-none cursor-pointer p-2 -ml-2 text-gray-700 hover:text-gray-900">
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
            <div class="absolute left-0 right-0 top-full mt-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4">
              <SearchBox className="w-full" />
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-gray-500">タグフィルタ</span>
                  <a
                    id="mobile-clear-filters"
                    href="/"
                    class="hidden text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    全フィルタを解除
                  </a>
                </div>
                <div id="mobile-tag-filter-list" class="flex flex-wrap gap-2"></div>
              </div>
            </div>
          </details>

          <div class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <a href="/" class="text-2xl font-bold text-gray-900 hover:text-gray-700">
              Dev Blog
            </a>
          </div>
          <SearchBox className="ml-auto hidden md:flex items-center w-60" />
        </div>
      </div>
    </header>
  );
};
