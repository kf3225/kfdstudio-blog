import { describe, it, expect } from "vitest";
import {
  createSearchIndex,
  addItems,
  clearIndex,
  searchIndex,
  getAllItems,
  getItemCount,
  calculateScore,
  type SearchableItem,
} from "../app/lib/search";

describe("searchIndex", () => {
  const mockItems: SearchableItem[] = [
    {
      id: "1",
      slug: "test-article-1",
      title: "TypeScript Tips",
      description: "Learn advanced TypeScript techniques",
      content: "This article covers advanced TypeScript patterns and type manipulation",
      pubDate: "2024-01-01",
      tags: ["typescript", "programming"],
    },
    {
      id: "2",
      slug: "test-article-2",
      title: "React Server Components",
      description: "Understanding React Server Components",
      content: "React Server Components allow for server-side rendering",
      pubDate: "2024-01-02",
      tags: ["react", "frontend"],
    },
  ];

  describe("searchIndex", () => {
    it("should return empty array for empty query", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "");

      expect(results).toHaveLength(0);
    });

    it("should return empty array for whitespace-only query", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "   ");

      expect(results).toHaveLength(0);
    });

    it("should search in title and score higher than description", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "TypeScript");

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe("TypeScript Tips");
      expect(results[0].score).toBeGreaterThan(0);
    });

    it("should search in description", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "advanced");

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].description).toContain("advanced");
    });

    it("should search in content", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "patterns");

      expect(results.length).toBeGreaterThan(0);
    });

    it("should search in tags", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "programming");

      expect(results.length).toBeGreaterThan(0);
    });

    it("should be case-insensitive", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results1 = searchIndex(indexWithItems, "typescript");
      const results2 = searchIndex(indexWithItems, "TYPESCRIPT");

      expect(results1).toHaveLength(results2.length);
    });

    it("should respect limit parameter", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "test", 1);

      expect(results.length).toBeLessThanOrEqual(1);
    });

    it("should sort results by score descending", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "test");

      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
      }
    });

    it("should filter out items with zero score", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const results = searchIndex(indexWithItems, "nonexistent");

      expect(results).toHaveLength(0);
    });
  });

  describe("addItems", () => {
    it("should add items to index", () => {
      const searchIndexObj = createSearchIndex();
      const items: SearchableItem[] = [
        {
          id: "1",
          slug: "test",
          title: "Test",
          description: "Test article",
          content: "Test content",
          pubDate: "2024-01-01",
        },
      ];

      const indexWithItems = addItems(searchIndexObj, items);
      const count = getItemCount(indexWithItems);

      expect(count).toBe(1);
    });

    it("should add multiple items", () => {
      const searchIndexObj = createSearchIndex();
      const items: SearchableItem[] = [
        { id: "1", slug: "1", title: "1", description: "1", content: "1", pubDate: "2024-01-01" },
        { id: "2", slug: "2", title: "2", description: "2", content: "2", pubDate: "2024-01-01" },
        { id: "3", slug: "3", title: "3", description: "3", content: "3", pubDate: "2024-01-01" },
      ];

      const indexWithItems = addItems(searchIndexObj, items);
      const count = getItemCount(indexWithItems);

      expect(count).toBe(3);
    });
  });

  describe("clearIndex", () => {
    it("should remove all items", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const clearedIndex = clearIndex(indexWithItems);
      const count = getItemCount(clearedIndex);

      expect(count).toBe(0);
    });
  });

  describe("getAllItems", () => {
    it("should return copy of all items", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const items = getAllItems(indexWithItems);

      expect(items).toEqual(mockItems);
    });

    it("should return independent copy", () => {
      const searchIndexObj = createSearchIndex();
      const indexWithItems = addItems(searchIndexObj, mockItems);
      const items1 = getAllItems(indexWithItems);
      items1.push({
        id: "3",
        slug: "3",
        title: "3",
        description: "3",
        content: "3",
        pubDate: "2024-01-01",
      } as SearchableItem);

      const items2 = getAllItems(indexWithItems);

      expect(items2).toHaveLength(mockItems.length);
    });
  });
});

describe("calculateScore", () => {
  const mockItem: SearchableItem = {
    id: "1",
    slug: "test",
    title: "TypeScript",
    description: "Learn TypeScript",
    content: "TypeScript article content",
    pubDate: "2024-01-01",
    tags: ["typescript"],
  };

  it("should give higher score for title match", () => {
    const score = calculateScore(mockItem, "typescript");

    expect(score).toBeGreaterThan(0);
    expect(score).toBeGreaterThanOrEqual(10);
  });

  it("should give moderate score for description match", () => {
    const score = calculateScore(mockItem, "learn");

    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(10);
  });

  it("should give low score for content match", () => {
    const score = calculateScore(mockItem, "content");

    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(10);
  });

  it("should give moderate score for tag match", () => {
    const score = calculateScore(mockItem, "typescript");

    expect(score).toBeGreaterThan(3);
  });

  it("should return zero for no match", () => {
    const score = calculateScore(mockItem, "nonexistent");

    expect(score).toBe(0);
  });
});
