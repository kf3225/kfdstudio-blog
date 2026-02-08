import { FC } from "hono/jsx";
import { SearchBox } from "./SearchBox";

interface HeaderProps {
  currentPath?: string;
}

export const Header: FC<HeaderProps> = ({ currentPath: _currentPath }) => {
  return (
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 max-w-4xl">
        <div class="flex items-center">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-bold text-gray-900 hover:text-gray-700">
              Dev Blog
            </a>
          </div>
          <SearchBox />
        </div>
      </div>
    </header>
  );
};
