import type { Component, JSX } from "solid-js";
import Layout from "./components/layout/Layout";

const App: Component<{ children?: JSX.Element }> = (props) => {
  return <Layout>{props.children}</Layout>;
};

export default App;
