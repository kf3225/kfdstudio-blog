import { renderMobileFilterMenu } from "./mobile-filter-menu";

const PARTIAL_TARGET_IDS = [
  "post-list-container",
  "pagination-container",
  "desktop-tag-filter",
] as const;

interface FilterNavigationDeps {
  fetchHtml?: (url: URL) => Promise<string>;
  renderMobileMenu?: () => Promise<void>;
}

const defaultDeps: Required<FilterNavigationDeps> = {
  fetchHtml: async (url: URL) => {
    const response = await fetch(url.toString(), { headers: { "X-Requested-With": "partial" } });
    return response.text();
  },
  renderMobileMenu: renderMobileFilterMenu,
};

const isIndexPage = (url: URL): boolean => {
  return url.pathname === "/";
};

const getTagFilterLink = (target: EventTarget | null): HTMLAnchorElement | null => {
  if (!(target instanceof Element)) {
    return null;
  }

  const link = target.closest("a[data-tag-filter-link]");
  return link instanceof HTMLAnchorElement ? link : null;
};

const replaceIndexPartials = (doc: Document): void => {
  // サーバー描画のHTMLから必要セクションだけ差し替えて、ページ遷移コストを下げる。
  PARTIAL_TARGET_IDS.forEach((id) => {
    const current = document.getElementById(id);
    const next = doc.getElementById(id);
    if (!current || !next) {
      return;
    }

    current.replaceWith(next);
  });
};

const navigateIndexPartially = async (
  url: URL,
  pushState: boolean,
  deps: Required<FilterNavigationDeps>,
): Promise<void> => {
  try {
    const html = await deps.fetchHtml(url);
    const parser = new DOMParser();
    const nextDoc = parser.parseFromString(html, "text/html");

    replaceIndexPartials(nextDoc);
    if (pushState) {
      history.pushState({}, "", url.toString());
    }

    await deps.renderMobileMenu();
  } catch (error) {
    console.error("Filter navigation error:", error);
    if (pushState) {
      window.location.href = url.toString();
    }
  }
};

export const initFilterNavigation = (deps: FilterNavigationDeps = {}): void => {
  const resolvedDeps = { ...defaultDeps, ...deps };

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    const link = getTagFilterLink(e.target);
    if (!link || !link.href) {
      return;
    }

    const nextUrl = new URL(link.href, window.location.origin);
    if (!isIndexPage(nextUrl)) {
      return;
    }

    e.preventDefault();
    void navigateIndexPartially(nextUrl, true, resolvedDeps);
  });

  window.addEventListener("popstate", () => {
    const currentUrl = new URL(window.location.href);
    if (!isIndexPage(currentUrl)) {
      return;
    }

    void navigateIndexPartially(currentUrl, false, resolvedDeps);
  });
};
