import { createClient } from "honox/client";
import hljs from "highlight.js";

createClient();

// コードブロックにシンタックスハイライトを適用
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
});
