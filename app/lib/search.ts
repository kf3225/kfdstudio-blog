export interface SearchableItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  pubDate: string;
  updatedDate?: string;
  tags?: string[];
}

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags?: string[];
  score: number;
}

export interface ScoreCalculator {
  calculate(item: SearchableItem, query: string): number;
}

const defaultWeights = {
  title: 10,
  description: 5,
  content: 2,
  tags: 3,
} as const;

export const calculateScore = (item: SearchableItem, query: string): number => {
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const content = item.content.toLowerCase();
  const tags = item.tags?.join(" ").toLowerCase() || "";

  let score = 0;

  if (title.includes(query)) {
    score += defaultWeights.title;
  }

  if (description.includes(query)) {
    score += defaultWeights.description;
  }

  if (content.includes(query)) {
    score += defaultWeights.content;
  }

  if (tags.includes(query)) {
    score += defaultWeights.tags;
  }

  return score;
};

export interface SearchIndexConfig {
  scoreCalculator?: ScoreCalculator;
}

export const createSearchIndex = (config?: SearchIndexConfig): SearchIndex => {
  const scoreCalculator = config?.scoreCalculator || { calculate: calculateScore };

  return {
    items: [],
    scoreCalculator,
  };
};

export interface SearchIndex {
  items: SearchableItem[];
  scoreCalculator: ScoreCalculator;
}

export const addItems = (index: SearchIndex, items: SearchableItem[]): SearchIndex => {
  return {
    ...index,
    items: [...index.items, ...items],
  };
};

export const clearIndex = (index: SearchIndex): SearchIndex => {
  return {
    ...index,
    items: [],
  };
};

export const searchIndex = (index: SearchIndex, query: string, limit = 10): SearchResult[] => {
  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase();
  const results = index.items
    .map((item) => ({
      item,
      score: index.scoreCalculator.calculate(item, normalizedQuery),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item, score }) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      description: item.description,
      pubDate: item.pubDate,
      tags: item.tags,
      score,
    }));

  return results;
};

export const getAllItems = (index: SearchIndex): SearchableItem[] => {
  return [...index.items];
};

export const getItemCount = (index: SearchIndex): number => {
  return index.items.length;
};
