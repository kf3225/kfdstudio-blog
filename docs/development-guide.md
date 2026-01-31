# 開発ガイド

このドキュメントでは、KFD Studio Blogの開発フローと手順を説明します。

---

## 前提条件

- Node.js 18.x 以上
- pnpm 10.x 以上
- Wrangler 4.x 以上
- Git

---

## 初期設定

### プロジェクトの作成

```bash
pnpm create hono@latest kfdstudio-blog --template cloudflare-workers
cd kfdstudio-blog
```

### 依存のインストール

パッケージマネージャーとしてpnpmを使用し、依存をインストールします。

```bash
pnpm install
```

### Viteの設定

vite.config.tsを作成し、@cloudflare/vite-pluginを設定します。

@cloudflare/vite-pluginは、ViteとCloudflare Workersの連携を可能にします。プロジェクトのルートにあるwrangler.jsoncまたはwrangler.tomlを自動的に検知し、適切な設定でビルドを行います。

### simple-git-hooksの設定

Gitフックを設定します。これにより、コミット時にlintとformatが自動的に実行されます。

---

## ローカル開発

### 開発サーバー起動

開発サーバーを起動します。Viteの開発サーバーが起動します。

```bash
pnpm dev
```

### Contentディレクトリ

ローカル開発時は`routes/blog/`または`content/blog/`ディレクトリのMarkdownファイルから読み込みます。本番環境ではGitHubリポジトリからロードします。

---

## Lint & Format

### Lint

lintコマンドでコードチェックを行います。lint:fixで自動修正可能なエラーを修正します。

### Format

formatコマンドでコードをフォーマットします。format:checkでフォーマットをチェックします。

### TypeCheck

typecheckコマンドでTypeScriptの型チェックを行います。

---

## Git Hooks

### pre-commitフック

コミット時に実行されます：

1. lint:fixでLintエラーを自動修正
2. formatでコードをフォーマット

修正が行われた場合、コミット後に再度コミットが必要です。

### pre-pushフック

プッシュ時に実行されます：

1. lintでLintチェック
2. typecheckでTypeScript型チェック

エラーがある場合、プッシュが中断されます。

### Git Hooksのスキップ

一時的にスキップする場合、--no-verifyフラグを使用します。

---

## ビルド

### 本番ビルド

buildコマンドで静的サイトをビルドします。Viteを使用してビルドが行われます。ビルドプロセスは以下の手順で進みます：

1. GitHubからMarkdownを取得
2. 静的サイトを生成
3. 検索インデックスを生成
4. RSSフィードを生成

出力先はdist/ディレクトリです。

```bash
pnpm build
```

### プレビュー

previewコマンドでビルド後のプレビューが可能です。

```bash
pnpm preview
```

---

## Cloudflare設定

### Wranglerの設定

wrangler.jsoncファイルでCloudflareリソースを設定します。KVネームスペースを定義します。

---

## デプロイ

### GitHub連携

GitHubリポジトリとCloudflare Workersを連携します。ビルドコマンドはpnpm build、出力ディレクトリはdist/です。

### 自動デプロイ

GitHubへのプッシュ時に自動ビルド・デプロイされます。

### 手動デプロイ

手動でデプロイする場合、buildとdeployコマンドを実行します。

---

## 記事の追加

ローカル開発時に記事を追加する場合、`routes/blog/`または`content/blog/`にMarkdownファイルを作成します。Frontmatterを設定し、開発サーバーに反映されます。

### ファイル名形式

`YYYY-MM-DD-slug.md` 形式で作成します。

### Frontmatter

```yaml
---
title: 記事タイトル
description: 記事の説明
pubDate: 2024-01-01
updatedDate: 2024-01-02
tags: [tag1, tag2]
slug: article-slug
---
```

### 記事の公開

ローカルで記事を作成した後、GitHubリポジトリにコミット・プッシュすると自動的にビルド・デプロイされます。

---

## 検索機能

### 使用方法

検索ボックスに検索語を入力し、リアルタイムで検索結果が表示されます。タイトル、説明、本文、タグが検索対象です。

### 検索インデックス

ビルド時に検索インデックスが生成され、KVに保存されます。

---

## トラブルシューティング

### Lintエラー

lint:fixコマンドを実行します。

### Typeエラー

typecheckコマンドを実行します。

### ビルドエラー

依存を確認し、TypeScriptを確認し、Cloudflare設定を確認します。

### Git Hooksの問題

Git Hooksが動作しない場合、以下のコマンドを実行します：

```bash
pnpm simple-git-hooks
```

---

## コマンド一覧

| コマンド          | 説明                                   |
| ----------------- | -------------------------------------- |
| pnpm dev          | Vite開発サーバー起動                   |
| pnpm build        | Viteでビルド                           |
| pnpm preview      | ビルド結果をプレビュー                 |
| pnpm deploy       | ビルドしてCloudflare Workersにデプロイ |
| pnpm lint         | Lintチェック                           |
| pnpm lint:fix     | Lint修正                               |
| pnpm format       | コードフォーマット                     |
| pnpm format:check | フォーマットチェック                   |
| pnpm typecheck    | TypeScript型チェック                   |
| pnpm cf-typegen   | Wranglerの型定義を生成                 |
