import { createClient } from "honox/client";
import hljs from "highlight.js";

createClient();

const initSearch = (): void => {
  const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
  const searchResults = document.getElementById("search-results") as HTMLDivElement | null;

  if (!searchInput || !searchResults) {
    console.error("Search elements not found");
    return;
  }

  let searchTimeout: ReturnType<typeof setTimeout> | null = null;

  interface SearchApiResponse {
    results: SearchResultItem[];
  }

  interface SearchResultItem {
    slug: string;
    title: string;
    description: string;
  }

  const performSearch = async (query: string): Promise<void> => {
    if (!query.trim()) {
      searchResults.classList.add("hidden");
      searchResults.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
      const data: SearchApiResponse = await response.json();

      if (data.results && data.results.length > 0) {
        searchResults.innerHTML = data.results
          .map(
            (result: SearchResultItem) => `
              <a href="/blog/${result.slug}" class="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                <div class="text-sm font-medium text-gray-900">${escapeHtml(result.title)}</div>
                <div class="text-xs text-gray-500 mt-1 line-clamp-1">${escapeHtml(result.description)}</div>
              </a>
            `,
          )
          .join("");
        searchResults.classList.remove("hidden");
      } else {
        searchResults.innerHTML =
          '<div class="text-sm text-gray-500 px-4 py-3">検索結果が見つかりません</div>';
        searchResults.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  searchInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      performSearch(value);
    }, 300);
  });

  searchInput.addEventListener("focus", () => {
    const value = searchInput.value;
    if (value.trim()) {
      performSearch(value);
    }
  });

  document.addEventListener("click", (e) => {
    const container = document.getElementById("search-container");
    if (container && !container.contains(e.target as Node)) {
      searchResults.classList.add("hidden");
    }
  });
};

const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const initCodeHighlighting = (): void => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initCodeHighlighting();
});
