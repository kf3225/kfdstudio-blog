import { buildTagFilterHref } from "../tag-filter";

const createTagFilterLink = (tag: string, selectedTags: string[]): HTMLAnchorElement => {
  const isSelected = selectedTags.includes(tag);
  const nextTags = isSelected
    ? selectedTags.filter((selectedTag) => selectedTag !== tag)
    : [...selectedTags, tag];

  const link = document.createElement("a");
  link.href = buildTagFilterHref(nextTags);
  link.className = `px-2.5 py-1 rounded text-xs transition-colors ${
    isSelected ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  }`;
  link.textContent = `#${tag}`;
  return link;
};

export const initMobileFilterMenu = async (): Promise<void> => {
  const menu = document.getElementById("mobile-filter-menu") as HTMLDetailsElement | null;
  const tagList = document.getElementById("mobile-tag-filter-list");
  const clearLink = document.getElementById("mobile-clear-filters") as HTMLAnchorElement | null;
  if (!menu || !tagList || !clearLink) {
    return;
  }

  const selectedTags = [...new Set(new URLSearchParams(window.location.search).getAll("tag"))];
  if (selectedTags.length > 0) {
    menu.open = true;
    clearLink.classList.remove("hidden");
  } else {
    clearLink.classList.add("hidden");
  }

  document.addEventListener("pointerdown", (e) => {
    if (!menu.open) {
      return;
    }

    if (!menu.contains(e.target as Node)) {
      menu.open = false;
    }
  });

  try {
    const response = await fetch("/api/tags");
    const data = (await response.json()) as { tags?: string[] };
    const fragment = document.createDocumentFragment();

    (data.tags ?? []).forEach((tag) => {
      fragment.appendChild(createTagFilterLink(tag, selectedTags));
    });

    tagList.replaceChildren(fragment);
  } catch (error) {
    console.error("Tag filter error:", error);
  }
};
