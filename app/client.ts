import { createClient } from "honox/client";
import hljs from "highlight.js";
import { SearchComponent } from "./components/SearchComponent";

createClient();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });

  const searchComponent = new SearchComponent("search-component");
  searchComponent.mount();
});
