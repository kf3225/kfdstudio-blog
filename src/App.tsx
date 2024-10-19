import type { Component, JSX } from "solid-js";
import Layout from "./components/layout/Layout";

const App: Component<{ children?: JSX.Element }> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default App;
