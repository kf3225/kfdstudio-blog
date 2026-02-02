import type { FC } from "hono/jsx";

export interface Meta {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  tags?: string[];
  slug?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags?: string[];
  content: string;
}

export interface MDXModule {
  frontmatter: Meta;
  default: FC;
}
