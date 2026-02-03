import { FC } from "hono/jsx";

interface HeaderProps {
  currentPath?: string;
}

export const Header: FC<HeaderProps> = ({ currentPath: _currentPath }) => {
  return (
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 max-w-3xl">
        <div class="flex items-center justify-start">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-bold text-gray-900 hover:text-gray-700">
              Dev Blog
            </a>
          </div>

          <div class="ml-auto flex items-center justify-center w-80">
            <div id="search-container" class="relative w-full">
              <input
                type="text"
                id="search-input"
                placeholder="記事を検索..."
                class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                autocomplete="off"
              />
              <div id="search-results" class="hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
