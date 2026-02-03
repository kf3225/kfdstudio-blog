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

          <div class="ml-auto flex items-center">
            <div id="search-component"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
