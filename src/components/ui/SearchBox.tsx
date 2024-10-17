import { Combobox } from "@kobalte/core/combobox";
import { Check, ChevronDown, X } from "lucide-solid";
import {
  type Accessor,
  type Component,
  For,
  type Setter,
  Show,
} from "solid-js";
import { tags } from "../../constants/posts";

interface SearchBoxProps {
  selectedTags: Accessor<string[]>;
  setSelectedTags: Setter<string[]>;
}

const SearchBox: Component<SearchBoxProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <div class="w-full max-w-md mx-auto">
      <div class="relative mb-14">
        <Combobox<string>
          multiple
          options={tags}
          value={selectedTags()}
          onChange={setSelectedTags}
          placeholder="Search Article Tags…"
          itemComponent={(props) => (
            <Combobox.Item
              item={props.item}
              class="flex items-center justify-between px-3 py-2 text-sm cursor-pointer focus:outline-none data-[highlighted]:bg-gray-100"
            >
              <Combobox.ItemLabel>{props.item.rawValue}</Combobox.ItemLabel>
              <Show when={selectedTags().includes(props.item.rawValue)}>
                <Combobox.ItemIndicator>
                  <Check class="w-4 h-4 text-blue-500" />
                </Combobox.ItemIndicator>
              </Show>
            </Combobox.Item>
          )}
        >
          <Combobox.Control<string>
            aria-label="Article Tags"
            class="inline-flex justify-between w-full rounded-md border border-gray-300 bg-white text-sm transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
          >
            {(state) => (
              <>
                <div class="flex items-center flex-1 p-2">
                  <Combobox.Input class="flex-1 min-w-0 bg-transparent focus:outline-none" />
                </div>
                <div class="flex items-center">
                  <button
                    type="button"
                    onClick={state.clear}
                    class="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <X class="w-4 h-4" />
                  </button>
                  <Combobox.Trigger class="p-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <ChevronDown class="w-4 h-4" />
                  </Combobox.Trigger>
                </div>
              </>
            )}
          </Combobox.Control>
          <Combobox.Portal>
            <Combobox.Content
              class="w-[var(--kb-combobox-content-width)] max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
                     max-h-[360px] overflow-y-auto mt-1 rounded-md border border-gray-200 bg-white shadow-lg 
                     animate-in fade-in-80 zoom-in-95 
                     fixed sm:absolute left-0 right-0 sm:left-auto sm:right-auto"
            >
              <Combobox.Listbox class="p-1" />
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox>
        <Show when={selectedTags().length > 0}>
          <div class="absolute left-0 right-0 -bottom-10 flex items-center">
            <div class="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div class="inline-flex gap-2 px-1">
                <For each={selectedTags()}>
                  {(value) => (
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                      {value}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTags(
                            selectedTags().filter((v) => v !== value),
                          )
                        }
                        class="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                      >
                        <X class="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </For>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default SearchBox;
