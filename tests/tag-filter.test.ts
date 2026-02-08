import { describe, expect, it } from "vitest";
import type { MDXModule } from "../app/lib/blog-loader";
import {
  buildTagFilterHref,
  buildTagQuerySuffix,
  filterModulesBySelectedTags,
  getSelectedTagsFromSearchParams,
  getSelectedTagsFromUrl,
  getSortedTagsFromModules,
  normalizeSelectedTags,
  toggleTagSelection,
} from "../app/lib/tag-filter";

const createModule = (tags: string[]): MDXModule => {
  return {
    frontmatter: {
      title: "title",
      description: "desc",
      pubDate: "2025-01-01",
      tags,
    },
    default: () => null,
  };
};

describe("tag-filter utilities", () => {
  it("normalizeSelectedTags should trim and dedupe values", () => {
    expect(normalizeSelectedTags([" react ", "react", "", "ts"])).toEqual(["react", "ts"]);
  });

  it("getSelectedTagsFromSearchParams should parse tag query list", () => {
    const params = new URLSearchParams("tag=react&tag=ts&tag=react");
    expect(getSelectedTagsFromSearchParams(params)).toEqual(["react", "ts"]);
  });

  it("getSelectedTagsFromUrl should parse absolute and relative urls", () => {
    expect(getSelectedTagsFromUrl("https://example.com/?tag=react&tag=ts")).toEqual([
      "react",
      "ts",
    ]);
    expect(getSelectedTagsFromUrl("/?tag=react&tag=ts")).toEqual(["react", "ts"]);
  });

  it("toggleTagSelection should add and remove a tag", () => {
    expect(toggleTagSelection(["react"], "ts")).toEqual(["react", "ts"]);
    expect(toggleTagSelection(["react", "ts"], "ts")).toEqual(["react"]);
  });

  it("filterModulesBySelectedTags should keep only entries matching all selected tags", () => {
    const modules = [
      { id: "1", module: createModule(["react", "ts"]) },
      { id: "2", module: createModule(["react"]) },
      { id: "3", module: createModule(["ts"]) },
    ];

    const filtered = filterModulesBySelectedTags(modules, ["react", "ts"]);
    expect(filtered.map((entry) => entry.id)).toEqual(["1"]);
  });

  it("filterModulesBySelectedTags should allow behavior extension via custom strategy", () => {
    const modules = [
      { id: "1", module: createModule(["react"]) },
      { id: "2", module: createModule(["ts"]) },
    ];
    const matchAny = (postTags: readonly string[], selectedTags: readonly string[]): boolean =>
      selectedTags.some((tag) => postTags.includes(tag));

    const filtered = filterModulesBySelectedTags(modules, ["react", "ts"], matchAny);
    expect(filtered.map((entry) => entry.id)).toEqual(["1", "2"]);
  });

  it("buildTagFilterHref should create stable tag query order", () => {
    expect(buildTagFilterHref(["react", "ts"])).toBe("/?tag=react&tag=ts");
    expect(buildTagFilterHref([])).toBe("/");
  });

  it("buildTagQuerySuffix should create pagination-friendly suffix", () => {
    expect(buildTagQuerySuffix(["react", "ts"])).toBe("&tag=react&tag=ts");
    expect(buildTagQuerySuffix([])).toBe("");
  });

  it("getSortedTagsFromModules should sort by frequency", () => {
    const modules = {
      "a.mdx": createModule(["react", "ts"]),
      "b.mdx": createModule(["react"]),
      "c.mdx": createModule(["css"]),
    };
    expect(getSortedTagsFromModules(modules)).toEqual(["react", "ts", "css"]);
  });
});
