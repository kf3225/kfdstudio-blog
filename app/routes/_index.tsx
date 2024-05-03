import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{
			name: "description",
			content: "Welcome to Remix! Using Vite and Cloudflare!",
		},
	];
};

export default function Index() {
	return (
		<div>
			<div>
				<h1 className="text-3xl font-bold underline">Hello world!</h1>
			</div>
			<div>
				<Button>Click Me</Button>
			</div>
		</div>
	);
}
