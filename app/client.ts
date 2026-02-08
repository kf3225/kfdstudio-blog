import { createClient } from "honox/client";
import hljs from "highlight.js";
import { initMobileFilterMenu } from "./lib/client/mobile-filter-menu";
import { initSearchUI } from "./lib/client/search-ui";

createClient();

const initCodeHighlighting = (): void => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initSearchUI();
  initCodeHighlighting();
  void initMobileFilterMenu();
});
