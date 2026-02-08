import { FC } from "hono/jsx";

const buildTagFilterHref = (tags: string[]): string => {
  if (tags.length === 0) {
    return "/";
  }

  const params = tags.map((tag) => `tag=${encodeURIComponent(tag)}`).join("&");
  return `/?${params}`;
};

interface TagFilterListProps {
  tags: string[];
  selectedTags?: string[];
}

export const TagFilterList: FC<TagFilterListProps> = ({ tags, selectedTags = [] }) => {
  return (
    <div class="w-56 shrink-0">
      <div class="sticky top-20">
        <div class="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <a
              key={tag}
              href={buildTagFilterHref(
                selectedTags.includes(tag)
                  ? selectedTags.filter((selectedTag) => selectedTag !== tag)
                  : [...selectedTags, tag],
              )}
              class={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              #{tag}
            </a>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <div class="mt-3">
            <a href="/" class="text-xs text-gray-500 hover:text-gray-700 underline">
              全フィルタを解除
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
