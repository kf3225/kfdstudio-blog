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

export class DefaultScoreCalculator implements ScoreCalculator {
  private readonly weights = {
    title: 10,
    description: 5,
    content: 2,
    tags: 3,
  };

  calculate(item: SearchableItem, query: string): number {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    const content = item.content.toLowerCase();
    const tags = item.tags?.join(" ").toLowerCase() || "";

    let score = 0;

    if (title.includes(query)) {
      score += this.weights.title;
    }

    if (description.includes(query)) {
      score += this.weights.description;
    }

    if (content.includes(query)) {
      score += this.weights.content;
    }

    if (tags.includes(query)) {
      score += this.weights.tags;
    }

    return score;
  }
}

export interface SearchIndexConfig {
  scoreCalculator: ScoreCalculator;
}

export class SearchIndex {
  private items: SearchableItem[] = [];
  private scoreCalculator: ScoreCalculator;

  constructor(config?: Partial<SearchIndexConfig>) {
    this.scoreCalculator = config?.scoreCalculator || new DefaultScoreCalculator();
  }

  addItems(items: SearchableItem[]): void {
    this.items.push(...items);
  }

  clear(): void {
    this.items = [];
  }

  search(query: string, limit: number = 10): SearchResult[] {
    if (!query.trim()) {
      return [];
    }

    const normalizedQuery = query.toLowerCase();
    const results = this.items
      .map((item) => ({
        item,
        score: this.scoreCalculator.calculate(item, normalizedQuery),
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
  }

  getAllItems(): SearchableItem[] {
    return [...this.items];
  }

  getItemCount(): number {
    return this.items.length;
  }
}
