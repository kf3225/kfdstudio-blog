interface SearchResult {
  slug: string;
  title: string;
  description: string;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  isResultsVisible: boolean;
}

export const SearchComponent = () => {
  const state: SearchState = {
    query: "",
    results: [],
    isLoading: false,
    isResultsVisible: false,
  };

  return (
    <div id="search-container" class="relative w-full">
      <input
        type="text"
        id="search-input"
        placeholder="記事を検索..."
        class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        autocomplete="off"
      />
      {state.isResultsVisible && (
        <div
          id="search-results"
          class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-w-md"
        >
          {state.isLoading ? (
            <div class="text-sm text-gray-500 px-4 py-3">検索中...</div>
          ) : state.results.length > 0 ? (
            state.results.map((result) => (
              <a
                href={`/blog/${result.slug}`}
                class="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div class="text-sm font-medium text-gray-900">{result.title}</div>
                <div class="text-xs text-gray-500 mt-1 line-clamp-1">{result.description}</div>
              </a>
            ))
          ) : (
            <div class="text-sm text-gray-500 px-4 py-3">検索結果が見つかりません</div>
          )}
        </div>
      )}
    </div>
  );
};
