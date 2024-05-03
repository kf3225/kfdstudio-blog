import { Link } from "@remix-run/react";

import { BsGithub, BsTwitterX } from "react-icons/bs";
import { GrDocumentUser } from "react-icons/gr";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const MENUS = [
	{ name: "about", icon: GrDocumentUser, url: "/about" },
	{ name: "twitter", icon: BsTwitterX, url: "https://twitter.com/FKeisuke2" },
	{
		name: "github",
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
							<Button asChild variant={"ghost"} size={"icon"}>
								<Link to={menu.url}>
									<DynamicIcon />
								</Link>
							</Button>
						</li>
					);
				})}
				<li className="border-l-2">
					<ModeToggle />
				</li>
			</ul>
		</header>
	);
}
