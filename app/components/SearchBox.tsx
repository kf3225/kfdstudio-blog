import { FC } from "hono/jsx";

interface SearchBoxProps {
  className?: string;
}

export const SearchBox: FC<SearchBoxProps> = ({ className = "ml-auto flex items-center w-60" }) => {
  return (
    <div class={className}>
      <div data-search-root class="relative w-full">
        <input
          type="text"
          data-search-input
          placeholder=""
          class="w-full px-3 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          autocomplete="off"
        />
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <div
          data-search-results
          class="hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
        ></div>
      </div>
    </div>
  );
};
