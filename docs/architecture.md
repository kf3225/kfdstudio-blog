# KFD Studio Blog Architecture

## プロジェクト概要

| 項目               | 設定値                         |
| ------------------ | ------------------------------ |
| **プロジェクト名** | kfdstudio-blog                 |
| **ドメイン**       | <https://blog.kfdstudio.work/> |

---

## 技術スタック

### フロントエンド

- **フレームワーク**: Hono v4.0+
- **SSG**: Hono SSG (Static Site Generation)
- **スタイリング**: TailwindCSS v4.1+
- **型付け**: TypeScript 5.9.0+

### パッケージ管理

- **パッケージマネージャー**: pnpm 10.x.x
- **Linter**: oxlint 0.12.0+
- **Formatter**: oxfmt
- **Pre-commit**: simple-git-hooks 3.3.0+
- **ビルドツール**: Vite + @cloudflare/vite-plugin

### デプロイ

- **プラットフォーム**: Cloudflare Workers
- **連携**: GitHub連携（自動デプロイ）
- **DNS**: 既存ドメイン（DNS設定済み）

### Cloudflareリソース

- **KV**: 検索インデックス

### 外部リソース

- **GitHubリポジトリ**: Markdownファイル保存

---

## データ構造

### GitHubリポジトリ (Markdownファイル)

GitHubリポジトリにMarkdownファイルが保存されます。`content/blog/` ディレクトリ以下にファイルを配置し、ファイル名は `YYYY-MM-DD-slug.md` 形式とします。

Markdownファイルには以下のfrontmatterが含まれます：

- title: 記事タイトル
- description: 記事の説明
- pubDate: 公開日
- updatedDate: 最終更新日（オプション）
- tags: タグ配列（オプション）
- slug: 記事のスラッグ（URLに使用）

### KV (検索インデックス)

検索用のインデックスが保存されます。ビルド時に記事から検索インデックスを生成し、KVに保存します。

---

## コンテンツ管理

### Hono SSG

Hono SSGを使用して、GitHubからMarkdownファイルを読み込み、静的サイトを生成します。ローカル開発時はローカルファイルシステムから読み込みます。

### Contentディレクトリ

`routes/blog/` または `content/blog/` ディレクトリにMarkdownファイルを配置し、Hono SSGで処理します。

### デプロイフロー

1. 記事をGitHubリポジトリにコミット・プッシュ
2. Cloudflare Workersで自動ビルド実行
3. Hono SSGで静的サイト生成
4. Cloudflare Workersにデプロイ

---

## 検索機能

### 検索インデックス

ビルド時に検索インデックスを生成し、KVに保存します。タイトル、説明、本文、タグが検索対象です。

### 検索UI

ヘッダーまたはサイドバーに常時表示される検索ボックスで、リアルタイム検索が可能です。

---

## RSSフィード

### 提供範囲

メインRSS（最新記事のフィード）とタグ別RSSを提供します。

---

## 環境変数

### GitHub リソース

- GitHubリポジトリ: Markdownファイル保存用 (content/blog/)

### Cloudflare リソース

- KVネームスペース: blog-search-index

---

## 開発フロー

### ローカル開発

依存のインストール後に開発サーバーを起動します。ローカル開発時はContent Loaderがローカルファイルシステムから読み込みます。

### Pre-commitフック

コミット時にlintとformatを実行し、コードの品質を維持します。

### ビルド

ビルド時に静的サイトを生成し、検索インデックスとRSSフィードを作成します。

---

## 依存パッケージ

### 主要パッケージ

- hono: Webフレームワーク
- vite: ビルドツール
- @cloudflare/vite-plugin: Cloudflare Workers用Viteプラグイン
- @hono/ssg: Static Site Generation
- oxlint: Linter
- simple-git-hooks: Gitフック管理
- typescript: 型チェック
- wrangler: Cloudflare CLI
- tailwindcss: スタイリング
- honox: JSXコンポーネント（オプション）

---

## パフォーマンス

### 静的サイト

ビルド時に全ページを生成し、CloudflareのグローバルCDNで配信します。

### 検索

KVに事前に保存された検索インデックスを使用し、高速な検索を提供します。

### GitHub

バージョン管理システムとしてMarkdownファイルを管理します。GitHubリポジトリにコミット・プッシュすることで自動的にビルドとデプロイが行われます。

---

## 今後の拡張

### 可能な機能

コメント機能、OGP画像自動生成、シンタックスハイライト、画像最適化、sitemap.xml、robots.txt、PWA対応、多言語対応などが可能です。
