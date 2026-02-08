import { renderMobileFilterMenu } from "./mobile-filter-menu";

const PARTIAL_TARGET_IDS = [
  "post-list-container",
  "pagination-container",
  "desktop-tag-filter",
] as const;

const isIndexPage = (url: URL): boolean => {
  return url.pathname === "/";
};

const shouldHandleAsClientFilter = (target: EventTarget | null): target is HTMLAnchorElement => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const link = target.closest("a[data-tag-filter-link]");
  return link instanceof HTMLAnchorElement;
};

const replaceIndexPartials = (doc: Document): void => {
  PARTIAL_TARGET_IDS.forEach((id) => {
    const current = document.getElementById(id);
    const next = doc.getElementById(id);
    if (!current || !next) {
      return;
    }

    current.replaceWith(next);
  });
};

const navigateIndexPartially = async (url: URL, pushState: boolean): Promise<void> => {
  try {
    const response = await fetch(url.toString(), { headers: { "X-Requested-With": "partial" } });
    const html = await response.text();
    const parser = new DOMParser();
    const nextDoc = parser.parseFromString(html, "text/html");

    replaceIndexPartials(nextDoc);
    if (pushState) {
      history.pushState({}, "", url.toString());
    }

    await renderMobileFilterMenu();
  } catch (error) {
    console.error("Filter navigation error:", error);
    if (pushState) {
      window.location.href = url.toString();
    }
  }
};

export const initFilterNavigation = (): void => {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    if (!shouldHandleAsClientFilter(e.target)) {
      return;
    }

    const link = e.target.closest("a[data-tag-filter-link]");
    if (!(link instanceof HTMLAnchorElement) || !link.href) {
      return;
    }

    const nextUrl = new URL(link.href, window.location.origin);
    if (!isIndexPage(nextUrl)) {
      return;
    }

    e.preventDefault();
    void navigateIndexPartially(nextUrl, true);
  });

  window.addEventListener("popstate", () => {
    const currentUrl = new URL(window.location.href);
    if (!isIndexPage(currentUrl)) {
      return;
    }

    void navigateIndexPartially(currentUrl, false);
  });
};
