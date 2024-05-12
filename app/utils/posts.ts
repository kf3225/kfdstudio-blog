import type { AppLoadContext } from "@remix-run/node";
import { getTags } from "./tags";

export const posts = Object.fromEntries(
  Object.entries(
    import.meta.glob<true, string, MdxMeta>("../posts/*.mdx", {
      eager: true,
    }),
  )
    .sort(([prevPath, prev], [nextPath, next]) =>
      sortPostsByPublishDateDescend(prev, next),
    )
    .map(([path, meta]) => {
      return [path.replace("../posts/", ""), meta];
    }),
);

export async function getPosts(context: AppLoadContext, tag?: string) {
  if (!tag) {
    return await injectTagDataToPosts(context, posts);
  }
  return await injectTagDataToPosts(
    context,
    Object.fromEntries(
      Object.entries(posts).filter(([path, mdx]) => [
        path,
        mdx.frontmatter.tags.includes(tag),
      ]),
    ),
  );
}

async function injectTagDataToPosts(
  context: AppLoadContext,
  targetPosts: { [k: string]: MdxMeta },
) {
  const tags = await getTags(context);
  const postEntries = Object.fromEntries(
    Object.entries(targetPosts).map(([path, meta]) => {
      const frontmatter = {
        ...meta.frontmatter,
        tags: Object.fromEntries(
          meta.frontmatter.tags.map((tag) => {
            return [tag, tags[tag]];
          }),
        ),
      };
      return [path, { ...meta, frontmatter: frontmatter }];
    }),
  );
  return postEntries;
}

function sortPostsByPublishDateDescend(prev: MdxMeta, next: MdxMeta): number {
  const prevTime = Math.floor(
    new Date(prev.frontmatter.pubDate).getTime() / 1000,
  );
  const nextTime = Math.floor(
    new Date(next.frontmatter.pubDate).getTime() / 1000,
  );

  // 降順
  if (prevTime < nextTime) return 1;
  if (prevTime > nextTime) return -1;
  return 0;
}

export type MdxMeta = {
  default: (props: unknown) => JSX.Element;
  frontmatter: {
    title: string;
    author: string;
    description: string;
    image: string;
    pubDate: number;
    slug: string;
    tags: string[];
  };
};
