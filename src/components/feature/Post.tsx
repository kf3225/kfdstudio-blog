import { A } from "@solidjs/router";
import { type Accessor, type Component, For, Show } from "solid-js";
import { posts } from "../../constants/posts";

interface PostProps {
  selectedTags: Accessor<string[]>;
}

const Post: Component<PostProps> = ({ selectedTags }) => {
  const filteredPosts = () => {
    if (selectedTags().length === 0) {
      return posts;
    }
    return posts.filter((post) =>
      selectedTags().some((tag) => post.tags.includes(tag)),
    );
  };

  return (
    <div class="mx-auto">
      <Show
        when={filteredPosts().length > 0}
        fallback={<p>No posts found matching the selected tags.</p>}
      >
        <For each={filteredPosts()}>
          {(post) => (
            <A
              href={post.url}
              class="block mb-4 p-4 border rounded-lg transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <h2 class="text-lg font-bold mb-1 hover:underline">
                  {post.title}
                </h2>
                <p class="text-gray-500 text-xs mb-2">{post.url}</p>
                <div class="mt-2">
                  <For each={post.tags}>
                    {(tag) => (
                      <span class="mr-2 px-2 py-1 bg-gray-200 rounded-full text-sm">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            </A>
          )}
        </For>
      </Show>
    </div>
  );
};

export default Post;
