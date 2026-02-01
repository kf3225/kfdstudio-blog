import mdx from "@mdx-js/rollup";
import client from "honox/vite/client";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import ssg from "@hono/vite-ssg";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [
        client({
          input: ["/app/client.ts", "/app/style.css"],
        }),
      ],
    };
  }

  return {
    build: {
      emptyOutDir: false,
    },
    plugins: [
      honox(),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
      tailwindcss(),
      ssg({ entry }),
    ],
  };
});
