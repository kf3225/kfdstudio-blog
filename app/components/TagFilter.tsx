import { FC } from "hono/jsx";
import {
  buildTagFilterHref,
  TAG_FILTER_ACTIVE_CLASS,
  TAG_FILTER_INACTIVE_CLASS,
} from "../lib/tag-filter";

interface TagFilterListProps {
  tags: string[];
  selectedTags?: string[];
  containerId?: string;
  containerClassName?: string;
  contentClassName?: string;
}

export const TagFilterList: FC<TagFilterListProps> = ({
  tags,
  selectedTags = [],
  containerId,
  containerClassName = "w-56 shrink-0",
  contentClassName = "sticky top-20",
}) => {
  return (
    <div id={containerId} class={containerClassName}>
      <div class={contentClassName}>
        <div class="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <a
              key={tag}
              href={buildTagFilterHref(
                selectedTags.includes(tag)
                  ? selectedTags.filter((selectedTag) => selectedTag !== tag)
                  : [...selectedTags, tag],
              )}
              data-tag-filter-link="true"
              class={`px-2.5 py-1 rounded text-xs transition-colors ${selectedTags.includes(tag) ? TAG_FILTER_ACTIVE_CLASS : TAG_FILTER_INACTIVE_CLASS}`}
            >
              #{tag}
            </a>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <div class="mt-3">
            <a
              href="/"
              data-tag-filter-link="true"
              class="text-xs text-gray-500 hover:text-gray-700 underline dark:text-gray-400 dark:hover:text-gray-200"
            >
              全フィルタを解除
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
