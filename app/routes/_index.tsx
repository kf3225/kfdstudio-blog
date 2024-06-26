import { Link } from "@remix-run/react";
import { PostPagination } from "~/components/post-pagination";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { calculatePage } from "~/utils/pages";
import { posts } from "~/utils/posts";

export default function Index() {
  const postEntries = Object.entries(posts);
  const allPages = Math.ceil(postEntries.length / 8);
  const page = calculatePage("1", allPages);
  return (
    <main>
      <div className="flex justify-center py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {postEntries
            // 最新の8記事まで表示
            .slice(0, 8)
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
                          to={`posts/${path.replace(".mdx", "")}`}
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
                      <ul className="flex gap-1">
                        {meta.frontmatter.tags.map((tag) => (
                          <li key={tag}>
                            <Button asChild variant={"secondary"} size={"sm"}>
                              <Link
                                to={`/tags/${tag}`}
                                className="text-[10px] text-muted-foreground"
                              >
                                {tag}
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
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
      />
    </main>
  );
}
