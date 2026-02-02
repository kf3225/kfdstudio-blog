export class SearchComponent {
  private readonly containerId: string;
  private readonly config: SearchComponentConfig;

  constructor(containerId: string, config?: Partial<SearchComponentConfig>) {
    this.containerId = containerId;
    this.config = {
      placeholder: "記事を検索...",
      resultsLimit: 5,
      debounceDelay: 300,
      apiEndpoint: "/api/search",
      ...config,
    };
  }

  mount(): void {
    const container = document.getElementById(this.containerId);

    if (!container) {
      console.error(`Search container not found: ${this.containerId}`);
      return;
    }

    container.innerHTML = this.render();

    this.attachEventListeners();
  }

  private render(): string {
    return `
      <div id="search-container" class="relative">
        <input
          type="text"
          id="search-input"
          placeholder="${this.config.placeholder}"
          class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          autocomplete="off"
        />
        <div id="search-results" class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"></div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const input = document.getElementById("search-input") as HTMLInputElement;

    if (!input) {
      return;
    }

    let searchTimeout: ReturnType<typeof setTimeout> | null = null;

    const performSearch = async (query: string) => {
      if (!query.trim()) {
        this.hideResults();
        return;
      }

      try {
        const response = await fetch(
          `${this.config.apiEndpoint}?q=${encodeURIComponent(query)}&limit=${this.config.resultsLimit}`,
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          this.showResults(data.results);
        } else {
          this.showNoResults();
        }
      } catch (error) {
        console.error("Search error:", error);
        this.showNoResults();
      }
    };

    input.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      searchTimeout = setTimeout(() => {
        performSearch(value);
      }, this.config.debounceDelay);
    });

    input.addEventListener("focus", () => {
      const value = (document.getElementById("search-input") as HTMLInputElement).value;
      if (value.trim()) {
        performSearch(value);
      }
    });

    document.addEventListener("click", (e) => {
      const container = document.getElementById("search-container");
      if (container && !container.contains(e.target as Node)) {
        this.hideResults();
      }
    });
  }

  private showResults(results: SearchResult[]): void {
    const resultsContainer = document.getElementById("search-results") as HTMLDivElement;

    if (!resultsContainer) {
      return;
    }

    resultsContainer.innerHTML = results
      .map(
        (result) => `
        <a href="/blog/${result.slug}" class="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
          <div class="text-sm font-medium text-gray-900">${this.escapeHtml(result.title)}</div>
          <div class="text-xs text-gray-500 mt-1 line-clamp-1">${this.escapeHtml(result.description)}</div>
        </a>
      `,
      )
      .join();
    resultsContainer.classList.remove("hidden");
  }

  private showNoResults(): void {
    const resultsContainer = document.getElementById("search-results") as HTMLDivElement;

    if (!resultsContainer) {
      return;
    }

    resultsContainer.innerHTML =
      '<div class="text-sm text-gray-500 px-4 py-3">検索結果が見つかりません</div>';
    resultsContainer.classList.remove("hidden");
  }

  private hideResults(): void {
    const resultsContainer = document.getElementById("search-results") as HTMLDivElement;

    if (!resultsContainer) {
      return;
    }

    resultsContainer.innerHTML = "";
    resultsContainer.classList.add("hidden");
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  destroy(): void {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = "";
    }
  }
}

interface SearchComponentConfig {
  placeholder: string;
  resultsLimit: number;
  debounceDelay: number;
  apiEndpoint: string;
}

interface SearchResult {
  slug: string;
  title: string;
  description: string;
}
