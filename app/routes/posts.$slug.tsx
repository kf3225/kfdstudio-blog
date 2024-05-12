import { useParams } from "@remix-run/react";
import { posts } from "~/utils/posts";

export default function Post() {
  const params = useParams<{ slug: string }>();
  const post = posts[`${params.slug}.mdx`];
  const Component = post.default;
  return <Component />;
}
