/* @refresh reload */
import { render } from "solid-js/web";

import { Route, Router } from "@solidjs/router";
import App from "./App";
import NotFound from "./components/feature/NotFound";
import "./index.css";
import Article from "./pages/Article";

const root = document.getElementById("root");

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Article} />
      <Route path="*" component={NotFound} />
    </Router>
  ),
  // biome-ignore lint/style/noNonNullAssertion: auto-generated code
  root!,
);
