import { createClient } from "honox/client";
import hljs from "highlight.js";
import { initFilterNavigation } from "./lib/client/filter-navigation";
import { initMobileFilterMenu } from "./lib/client/mobile-filter-menu";
import { initSearchUI } from "./lib/client/search-ui";
import { initThemeToggle } from "./lib/client/theme";

createClient();

const initCodeHighlighting = (): void => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initFilterNavigation();
  initSearchUI();
  initCodeHighlighting();
  void initMobileFilterMenu();
});
