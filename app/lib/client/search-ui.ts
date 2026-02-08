interface SearchApiResponse {
  results: SearchResultItem[];
}

interface SearchResultItem {
  slug: string;
  title: string;
  description: string;
}

const createSearchResultItem = (result: SearchResultItem): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.href = `/blog/${result.slug}`;
  link.className =
    "block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 dark:hover:bg-gray-800 dark:border-gray-700";

  const title = document.createElement("div");
  title.className = "text-sm font-medium text-gray-900 dark:text-gray-100";
  title.textContent = result.title;

  const description = document.createElement("div");
  description.className = "text-xs text-gray-500 mt-1 line-clamp-1 dark:text-gray-400";
  description.textContent = result.description;

  link.appendChild(title);
  link.appendChild(description);
  return link;
};

const createEmptyResult = (): HTMLDivElement => {
  const empty = document.createElement("div");
  empty.className = "text-sm text-gray-500 px-4 py-3 dark:text-gray-400";
  empty.textContent = "検索結果が見つかりません";
  return empty;
};

const renderSearchResults = (container: HTMLElement, results: SearchResultItem[]): void => {
  container.replaceChildren();

  if (results.length === 0) {
    container.appendChild(createEmptyResult());
    return;
  }

  const fragment = document.createDocumentFragment();
  results.forEach((result) => {
    fragment.appendChild(createSearchResultItem(result));
  });
  container.appendChild(fragment);
};

export const initSearchUI = (): void => {
  const searchRoots = document.querySelectorAll<HTMLElement>("[data-search-root]");
  if (searchRoots.length === 0) {
    return;
  }

  searchRoots.forEach((searchRoot) => {
    const searchInput = searchRoot.querySelector<HTMLInputElement>("[data-search-input]");
    const searchResults = searchRoot.querySelector<HTMLDivElement>("[data-search-results]");
    if (!searchInput || !searchResults) {
      return;
    }

    let searchTimeout: ReturnType<typeof setTimeout> | null = null;

    const performSearch = async (query: string): Promise<void> => {
      if (!query.trim()) {
        searchResults.classList.add("hidden");
        searchResults.replaceChildren();
        return;
      }

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
        const data = (await response.json()) as SearchApiResponse;
        renderSearchResults(searchResults, data.results ?? []);
        searchResults.classList.remove("hidden");
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    searchInput.addEventListener("input", (e) => {
      const value = (e.target as HTMLInputElement).value;
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        void performSearch(value);
      }, 300);
    });

    searchInput.addEventListener("focus", () => {
      if (searchInput.value.trim()) {
        void performSearch(searchInput.value);
      }
    });

    document.addEventListener("click", (e) => {
      if (!searchRoot.contains(e.target as Node)) {
        searchResults.classList.add("hidden");
      }
    });
  });
};
