import { FC } from "hono/jsx";

interface HeaderProps {
  currentPath?: string;
}

export const Header: FC<HeaderProps> = ({ currentPath: _currentPath }) => {
  return (
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <a href="/" class="text-xl font-semibold text-gray-900 hover:text-gray-700">
            KFD Studio Blog
          </a>

          <div class="w-64">
            <div id="search-component"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
