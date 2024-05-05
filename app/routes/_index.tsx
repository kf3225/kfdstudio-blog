import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { posts } from "~/utils/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Index() {
  return (
    <main className="flex justify-center">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(posts)
          .slice(0, 4)
          .map(([path, meta]) => {
            return (
              <li key={path}>
                <Card className="relative">
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
                      <p>{new Date(meta.frontmatter.pubDate).toISOString()}</p>
                      <p>{meta.frontmatter.description}</p>
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
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
    </main>
  );
}
