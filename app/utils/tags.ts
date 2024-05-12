import type { AppLoadContext } from "@remix-run/cloudflare";

export const getTags = async (context: AppLoadContext) => {
  const service = context.cloudflare.env.BLOG_TAG_KV;
  const tagNames = (await service.list()).keys;
  const tags = await Promise.all(
    tagNames.map(async (key) => {
      const tagName = key.name;
      const tagValue = await service.get(tagName);
      const keyValue: [string, string | null] = [tagName, tagValue];
      return keyValue;
    }),
  );
  const tagEntries = Object.fromEntries(tags);
  return tagEntries;
};
