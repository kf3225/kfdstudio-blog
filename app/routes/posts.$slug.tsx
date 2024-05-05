import { useParams } from "@remix-run/react";
import { posts } from "../utils/posts";

export default function Post() {
  const params = useParams();
  const [post, ..._] = Object.entries(posts)
    .filter(([filename, _]) => `${params.slug}.mdx` === filename)
    .map(([_, meta]) => meta);
  const Component = post.default;
  return <Component />;
}
