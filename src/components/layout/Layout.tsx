import { A } from "@solidjs/router";
import type { Component, JSX } from "solid-js";
import Introduction from "../feature/Introduction";
import DialogMenu from "../ui/DialogMenu";
import githubSvgUrl from "/src/assets/github.svg";
import xSvgUrl from "/src/assets/x.svg";

const Header: Component = () => {
  const navItemStyle =
    "px-4 py-2 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded";
  return (
    <header class="mx-auto flex justify-center w-full max-w-[50rem] py-4">
      <nav class="flex justify-between w-full items-center px-4">
        <A href="/" class={navItemStyle}>
          Home
        </A>
        <DialogMenu name="About Me">
          <Introduction />
        </DialogMenu>
        <A
          href="https://x.com/FKeisuke2"
          class={`${navItemStyle} hidden sm:inline-block`}
        >
          X/Twitter
        </A>
        <A
          href="https://github.com/kf3225"
          class={`${navItemStyle} hidden sm:inline-block`}
        >
          Github
        </A>
      </nav>
    </header>
  );
};

const Footer: Component = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="py-8">
      <p class="text-center">
        &copy; {currentYear} @FKeisuke2. All rights reserved.
      </p>
    </footer>
  );
};

const MobileIcons: Component = () => {
  const imgStyle = "p-2 rounded-full transition-colors w-14 h-14";
  return (
    <div class="fixed bottom-4 right-4 flex flex-col space-y-2 sm:hidden bg-white">
      <A href="https://x.com/FKeisuke2">
        <img src={xSvgUrl} alt="X Icon" class={imgStyle} />
      </A>
      <A href="https://github.com/kf3225">
        <img src={githubSvgUrl} alt="Github Icon" class={imgStyle} />
      </A>
    </div>
  );
};

const Layout: Component<{ children?: JSX.Element }> = (props) => {
  return (
    <div class="container mx-auto flex flex-col min-h-screen relative">
      <Header />
      <main class="mx-auto flex w-full max-w-[50rem] flex-col py-10 flex-grow">
        {props.children}
      </main>
      <Footer />
      <MobileIcons />
    </div>
  );
};

export default Layout;
