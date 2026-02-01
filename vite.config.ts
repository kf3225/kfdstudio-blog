import adapter from '@hono/vite-dev-server/cloudflare';
import client from "honox/vite/client";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import ssg from "@hono/vite-ssg";
import { defineConfig } from "vite";

const entry = './app/server.ts'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        client({
          input: ['/app/client.ts', '/app/style.css'],
        }),
      ],
    }
  } else {
    return {
      build: {
        emptyOutDir: false,
      },
      plugins: [
        honox({
          entry,
          devServer: { adapter },
        }),
        tailwindcss(),
        ssg({ entry }),
      ],
    }
  }
})
