import type {} from "hono";

interface ImportGlobOptions {
  eager?: boolean;
}

interface ImportGlobResult<T> {
  [key: string]: T;
}

interface ImportMeta {
  glob<T>(pattern: string, options?: ImportGlobOptions): ImportGlobResult<T>;
}

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>): Response | Promise<Response>;
  }
}

declare global {
  const importMeta: ImportMeta;
}
