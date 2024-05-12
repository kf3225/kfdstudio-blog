import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { getTags } from "~/utils/tags";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const tags = await getTags(context);
  return json(tags);
};

export default function Tags() {
  const tags = useLoaderData<typeof loader>();
  return (
    <main>
      <h2 className="border-b-2 pb-4">Tags</h2>
      <ul className="flex gap-1 pt-4">
        {Object.entries(tags).map(([key, value]) => {
          return (
            <li key={key}>
              <Button asChild>
                <Link to={`/pages/${key}/1`}>#{value}</Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
