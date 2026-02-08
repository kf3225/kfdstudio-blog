import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";
import { Header } from "../components/Header";

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();",
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" />
      </head>
      <body class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Header />
        {children}
      </body>
    </html>
  );
});
