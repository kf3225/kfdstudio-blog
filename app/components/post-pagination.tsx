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
}) {
  return (
    <Pagination className="pt-8">
      <PaginationContent>
        <PaginationItem>
          {props.prev ? (
            <PaginationPrevious to={`/pages/${props.prev || "#"}`} />
          ) : (
            <Button disabled variant={"ghost"}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </PaginationItem>
        <PaginationItem className={props.prev !== null ? "block" : "hidden"}>
          <PaginationLink to={`/pages/${props.prev}`}>
            {props.prev}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive to={`/pages/${props.current}`}>
            {props.current}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={props.next !== null ? "block" : "hidden"}>
          <PaginationLink to={`/pages/${props.next}`}>
            {props.next}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={props.next !== null ? "block" : "hidden"}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          {props.next ? (
            <PaginationNext to={`/pages/${props.next || "#"}`} />
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
