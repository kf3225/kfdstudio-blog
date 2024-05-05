export const posts = Object.fromEntries(
  Object.entries(
    import.meta.glob<true, string, MdxMeta>("../posts/*.mdx", {
      eager: true,
    }),
  )
    .sort(([prevPath, prev], [nextPath, next]) => sortPostsDescend(prev, next))
    .map(([path, meta]) => {
      return [path.replace("../posts/", ""), meta];
    }),
);

function sortPostsDescend(prev: MdxMeta, next: MdxMeta): number {
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
