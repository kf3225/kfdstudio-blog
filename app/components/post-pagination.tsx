import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Button } from "./ui/button";

export function PostPagination(props: {
  prev: string | null;
  current: string;
  next: string | null;
  first: string | null;
  last: string | null;
  tag?: string;
}) {
  const searchTag = props.tag || "all";
  return (
    <Pagination className="pt-8">
      <PaginationContent>
        <PaginationItem>
          {props.prev ? (
            <PaginationPrevious
              to={`/pages/${searchTag}/${props.prev || "#"}`}
            />
          ) : (
            <Button disabled variant={"ghost"}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </PaginationItem>
        <PaginationItem className={props.prev !== null ? "block" : "hidden"}>
          <PaginationLink to={`/pages/${searchTag}/${props.prev}`}>
            {props.prev}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive to={`/pages/${searchTag}/${props.current}`}>
            {props.current}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={props.next !== null ? "block" : "hidden"}>
          <PaginationLink to={`/pages/${searchTag}/${props.next}`}>
            {props.next}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={props.next !== null ? "block" : "hidden"}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          {props.next ? (
            <PaginationNext to={`/pages/${searchTag}/${props.next || "#"}`} />
          ) : (
            <Button disabled variant={"ghost"}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
