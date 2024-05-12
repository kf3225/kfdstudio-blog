import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { PostPagination } from "~/components/post-pagination";
import { Tags } from "~/components/tags";
import { calculatePage } from "~/utils/pages";
import { getPosts } from "~/utils/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const posts = await getPosts(context);
  return json(posts);
};

export default function Page() {
  const posts = Object.entries(useLoaderData<typeof loader>());
  const param = useParams();
  const current = param.pageNum || "1";
  const allPages = Math.ceil(posts.length / 8);
  const page = calculatePage(current, allPages);
  const beginingNumToShowPost = (Number(current) - 1) * 8;
  const endingNumToShowPost = beginingNumToShowPost + 8;

  return (
    <main>
      <div className="flex justify-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {posts
            .slice(beginingNumToShowPost, endingNumToShowPost)
            .map(([path, meta]) => {
              return (
                <li key={path}>
                  <Card className="relative min-w-fit">
                    <CardHeader>
                      <div className="aspect-video bg-muted mb-4" />
                      <CardTitle>
                        <h3>{meta.frontmatter.title}</h3>
                        <Link
                          className="absolute inset-0"
                          to={`/posts/${path.replace(".mdx", "")}`}
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        <p>
                          {new Date(meta.frontmatter.pubDate).toISOString()}
                        </p>
                        <p>{meta.frontmatter.description}</p>
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="relative">
                      <Tags tags={meta.frontmatter.tags} />
                    </CardFooter>
                  </Card>
                </li>
              );
            })}
        </ul>
      </div>
      <PostPagination
        prev={page.prev}
        current={page.current}
        next={page.next}
        first={page.first}
        last={page.last}
        tag={param.tag}
      />
    </main>
  );
}
