# ブログ管理

```txt
pnpm install
pnpm run dev
```

```txt
pnpm run deploy
```

[Workerの設定に基づいて型を生成/同期するには](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
pnpm run cf-typegen
```

`Hono` をインスタンス化する際に、ジェネリクスとして `CloudflareBindings` を渡します:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
