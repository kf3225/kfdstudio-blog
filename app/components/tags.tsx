import { Link } from "@remix-run/react";
import { Button } from "./ui/button";

export function Tags(props: {
  tags: {
    [x: string]: string | null;
  };
}) {
  return (
    <ul className="flex gap-1">
      {Object.entries(props.tags).map(([tagId, tagValue]) => (
        <li key={tagId}>
          <Button asChild variant={"secondary"} size={"sm"}>
            <Link
              to={`/pages/${tagId}/1`}
              className="text-[10px] text-muted-foreground"
            >
              #{tagValue || ""}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
