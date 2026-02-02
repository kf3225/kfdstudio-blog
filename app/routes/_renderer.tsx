import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";
import { Header } from "../components/Header";

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
});
