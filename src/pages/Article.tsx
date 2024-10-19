import { type Component, createSignal } from "solid-js";
import Post from "../components/feature/Post";
import SearchBox from "../components/ui/SearchBox";

const Article: Component = () => {
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);

  return (
    <>
      <SearchBox {...{ selectedTags, setSelectedTags }} />
      <Post {...{ selectedTags }} />
    </>
  );
};

export default Article;
