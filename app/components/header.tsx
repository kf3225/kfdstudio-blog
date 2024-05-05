import { Link } from "@remix-run/react";

import { BsGithub, BsTwitterX } from "react-icons/bs";
import { GrDocumentUser } from "react-icons/gr";
import { cn } from "~/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const MENUS = [
  { name: "About me", icon: GrDocumentUser, url: "/about" },
  {
    name: "X/Twitter",
    icon: BsTwitterX,
    url: "https://twitter.com/FKeisuke2",
  },
  {
    name: "Github",
    icon: BsGithub,
    url: "https://github.com/kf3225/kfdstudio-blog",
  },
];

export function Header() {
  return (
    <header className="container h-14 flex items-center justify-between border-b-2">
      <Link to={"/"} className="font-bold text-xl">
        ~/.memo
      </Link>
      <ul className="flex items-center gap-1">
        {MENUS.map((menu) => {
          const DynamicIcon = menu.icon;
          return (
            <li key={menu.name}>
              <Button
                asChild
                variant={"ghost"}
                size={"icon"}
                className="relative group"
              >
                <Link to={menu.url}>
                  <DynamicIcon />
                  <span
                    className={cn(
                      "bg-secondary",
                      "text-muted-foreground",
                      "opacity-0",
                      "p-1",
                      "invisible",
                      "rounded",
                      "text-[12px]",
                      "top-11",
                      "group-active:visible",
                      "sm:group-hover:visible",
                      "opacity-100",
                      "absolute",
                    )}
                  >
                    {menu.name}
                  </span>
                </Link>
              </Button>
            </li>
          );
        })}
        <li className="border-l-2 pl-1">
          <ModeToggle />
        </li>
      </ul>
    </header>
  );
}
