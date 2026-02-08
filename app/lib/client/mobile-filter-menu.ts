import {
  buildTagFilterHref,
  getSelectedTagsFromSearchParams,
  TAG_FILTER_ACTIVE_CLASS,
  TAG_FILTER_INACTIVE_CLASS,
  toggleTagSelection,
} from "../tag-filter";

let cachedTags: string[] | null = null;
let isOutsideClickBound = false;

const createTagFilterLink = (tag: string, selectedTags: string[]): HTMLAnchorElement => {
  const isSelected = selectedTags.includes(tag);
  const nextTags = toggleTagSelection(selectedTags, tag);

  const link = document.createElement("a");
  link.href = buildTagFilterHref(nextTags);
  link.dataset.tagFilterLink = "true";
  link.className = `px-2.5 py-1 rounded text-xs transition-colors ${
    isSelected ? TAG_FILTER_ACTIVE_CLASS : TAG_FILTER_INACTIVE_CLASS
  }`;
  link.textContent = `#${tag}`;
  return link;
};

const getAllTags = async (): Promise<string[]> => {
  if (cachedTags) {
    return cachedTags;
  }

  const response = await fetch("/api/tags");
  const data = (await response.json()) as { tags?: string[] };
  cachedTags = data.tags ?? [];
  return cachedTags;
};

const bindOutsideClick = (menu: HTMLDetailsElement): void => {
  if (isOutsideClickBound) {
    return;
  }

  document.addEventListener("pointerdown", (e) => {
    if (!menu.open) {
      return;
    }

    if (!menu.contains(e.target as Node)) {
      menu.open = false;
    }
  });

  isOutsideClickBound = true;
};

export const renderMobileFilterMenu = async (): Promise<void> => {
  const menu = document.getElementById("mobile-filter-menu") as HTMLDetailsElement | null;
  const tagList = document.getElementById("mobile-tag-filter-list");
  const clearLink = document.getElementById("mobile-clear-filters") as HTMLAnchorElement | null;
  if (!menu || !tagList || !clearLink) {
    return;
  }

  const selectedTags = getSelectedTagsFromSearchParams(new URLSearchParams(window.location.search));
  if (selectedTags.length > 0) {
    menu.open = true;
    clearLink.classList.remove("hidden");
  } else {
    clearLink.classList.add("hidden");
  }
  bindOutsideClick(menu);

  try {
    const tags = await getAllTags();
    const fragment = document.createDocumentFragment();

    tags.forEach((tag) => {
      fragment.appendChild(createTagFilterLink(tag, selectedTags));
    });

    tagList.replaceChildren(fragment);
  } catch (error) {
    console.error("Tag filter error:", error);
  }
};

export const initMobileFilterMenu = async (): Promise<void> => {
  await renderMobileFilterMenu();
};
