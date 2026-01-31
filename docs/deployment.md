# デプロイガイド

このドキュメントでは、KFD Studio BlogをCloudflare Workersにデプロイする手順を説明します。

---

## 前提条件

- Cloudflareアカウント
- GitHubアカウント
- Wrangler 4.x 以上
- pnpm 10.x 以上

---

## 初期設定

### プロジェクトの作成

```bash
pnpm create hono@latest kfdstudio-blog --template cloudflare-workers
cd kfdstudio-blog
```

### 依存のインストール

```bash
pnpm install
```

### Viteの設定

vite.config.tsを作成し、@cloudflare/vite-pluginを設定します。

@cloudflare/vite-pluginは、ViteとCloudflare Workersの連携を可能にします。プロジェクトのルートにあるwrangler.jsoncまたはwrangler.tomlを自動的に検知し、適切な設定でビルドを行います。

---

## Cloudflare Workersの設定

### Wrangler設定

`wrangler.jsonc`で以下のリソースを設定します：

| 設定項目           | 値             |
| ------------------ | -------------- |
| name               | kfdstudio-blog |
| main               | src/index.ts   |
| compatibility_date | 2024-01-01     |

#### KVネームスペース

| 設定項目 | 値                  |
| -------- | ------------------- |
| binding  | KV                  |
| id       | `<KV_NAMESPACE_ID>` |

---

## Cloudflareリソースの作成

### KVネームスペース

WranglerでKVネームスペースblog-search-indexを作成し、IDを確認します。

---

## デプロイ

### Viteでビルド

```bash
pnpm build
```

Viteを使用してビルドが行われます。

### Wranglerでデプロイ

```bash
pnpm deploy
```

このコマンドで以下を実行します：

1. Viteでビルド
2. Workersにデプロイ

### ローカル開発サーバー

```bash
pnpm dev
```

---

## GitHub連携

GitHubリポジトリとCloudflare Workersを連携します。ビルドコマンドはpnpm build、出力ディレクトリはdist/です。

### 自動デプロイ

GitHubへのプッシュ時に自動ビルド・デプロイされます。

### 手動デプロイ

手動でデプロイする場合、buildとdeployコマンドを実行します。

---

## カスタムドメインの設定

Cloudflare DashboardでDNS設定を確認します。

---

## トラブルシューティング

### デプロイ失敗

ビルドコマンド、依存、TypeScriptエラー、Lintエラーを確認します。

### DNSが反映されない

DNS設定が間違っているか、DNSプロパゲーションを確認します。

---

## デプロイチェックリスト

デプロイ前に確認する項目：

- GitHubリポジトリが作成されている
- wrangler.jsoncが正しく設定されている
- KVネームスペースが作成されている
- カスタムドメインが設定されている
- DNSレコードが正しく設定されている

---

## 参考

- Cloudflare Workers Docs
- Wrangler CLI
- Cloudflare KV
- Hono Documentation
